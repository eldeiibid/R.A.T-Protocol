import Phaser from 'phaser';
import { RangedPlayer } from '../entities/RangedPlayer';
import { MeleePlayer } from '../entities/MeleePlayer';
import { Enemy } from '../entities/Enemy';
import { PickableObject } from '../objects/PickableObject';
import { InteractableObject } from '../objects/InteractableObject';
import { Pathfinder } from '../lib/Pathfinder';
import { GameUI } from '../ui/GameUI';

const LEVELS = ['level1', 'level2', 'level3', 'level4', 'level5'];

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.players = new Map();
        this.inputMappings = [];
            
        // índice del nivel actual (0 si la escena se lanza sin datos)
        this.levelIndex = data?.levelIndex ?? 0;
        this.fileName = LEVELS[this.levelIndex];
        this.changingLevel = false;

        //verifica si se ha pasado el estado de los jugadores al iniciar el nivel o si empiezan desde cero.
        this.playerSaveState = data?.playerState ?? null;
    }

    preload() {
        // Load assets
        this.load.image('rangePlayer', 'assets/images/rangePlayer.png');
        this.load.image('meleePlayer', 'assets/images/meleePlayer.png');
        this.load.image('enemy', 'assets/images/enemy.png');
        this.load.image('tiles', 'assets/images/tilemap.png');
        this.load.image('inventory', 'assets/images/inventory.png');
        this.load.image('redBat', 'assets/images/redBat.png');
        this.load.image('bluePistol', 'assets/images/bluePistol.png');
        this.load.image('meleeHit', 'assets/images/meleeHit.png');
        this.load.image('medkit', 'assets/images/itemMedkit.png');
        this.load.image('armor', 'assets/images/itemArmor.png');
        this.load.image('lever', 'assets/images/tileLeverOn.png')
        this.load.image('rangeHeal', 'assets/images/Fox/curarsefo.png');
        this.load.image('rangeInteract', 'assets/images/Fox/interactuarfo.png');
        this.load.image('meleeHeal', 'assets/images/Fox/curarseowl.png');
        this.load.image('rangeInteract', 'assets/images/Fox/interactuarowl.png');



        //PLACEHOLDER assets
        this.load.image('bullet', 'assets/images/otherBullet.png');
        //this.load.image('medkit', 'assets/images/tileMedkit.png');
        //this.load.image('armor', 'assets/images/tileArmor.png');
        //this.load.image('lever', 'assets/images/tileLever.png');

        // Load Tile map from file
        this.load.tilemapTiledJSON(this.fileName, `assets/maps/${this.fileName}.json`);

        // Hit sound
        this.load.audio('hit', 'assets/audio/hit.mp3');

        // Background music
        this.load.audio('music', 'assets/audio/music.mp3');
    }

    create() {
        //Entrada con fundido guapo
        this.cameras.main.fadeIn(200);

        // Looping background music, Silenciada temporalmente
        this.music = this.sound.add('music', { loop: true, volume: 0.0 });
        this.music.play();

        // Pause/resume the music with the scene and stop it on exit
        this.events.on('pause', () => this.music.pause());
        this.events.on('resume', () => this.music.resume());
        this.events.once('shutdown', () => {
            this.events.off('pause');
            this.events.off('resume');
            this.music.destroy();
        });

        // Crea el tilemap/jugadores/enemigos
        this.setUpWorld();
    
        // UI de los jugadores
        this.gameUI = new GameUI(this);

        // Pause with ESC and show the pause menu on top
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseScene');
        });
    }

    setUpWorld() {

        //El tilemap es de 25x16 tiles, cada tile es de 32x32px
        //Para dejar espacio visible de UI (600px de ventana - 16*32) 
        const TILEMAP_YOFFSET = 88;
        //crear mapa de tilemap, set de tiles y capa de tiles
        const map = this.make.tilemap({key: this.fileName, tileWidth: 32, tileHeight: 32}); //1:nombre del archivo json, 2:tamaño de tile
        const tileset = map.addTilesetImage('tileset', 'tiles'); //1: nombre del tileset en el archivo, 2: nombre del asset de la imagen con los tiles
        
        this.terrainLayer = map.createLayer('terrainLayer', tileset, 0 , TILEMAP_YOFFSET); //1: nombre de la capa en el archivo,2: tileset, 3: las coordenadas en las que se empieza a dibujar
        this.terrainLayer.setCollisionBetween(11, 33); //id de los tiles en el archivo
        //Pathfinder para detectar el terreno
        this.pathfinder = new Pathfinder(this.terrainLayer); 
        
        const entityLayer = map.createLayer('entityLayer', tileset, 0, TILEMAP_YOFFSET);
        //ocultar la capa para que no se puedan ver los tiles de guía
        entityLayer.setVisible(false);

        //capa de objetos
        const objectLayer = map.createLayer('objectLayer', tileset, 0, TILEMAP_YOFFSET);
        objectLayer.setVisible(false);

        //Crear objetos de la escena
        this.objectGroup = this.physics.add.group();
        this.spawnObjects(objectLayer);

        //Crear array de enemigos
        this.enemies = []
        //añadir grupo de físicas para poder manejar a muchos enemigos
        this.enemyGroup = this.physics.add.group();
        //spawnear a los enemigos
        this.spawnEnemies(entityLayer);

        //añadir grupo de físicas para los jugadores
        this.playerGroup = this.physics.add.group();
        //spawnear a los jugadores
        this.spawnPlayers(entityLayer, this.terrainLayer);
        //Crear array de jugadores
        this.playerArray = [this.player1, this.player2];
        //Y cargar sus estados guardados (en caso de que los haya)
        this.loadPlayerState();

        //collider entre enemigos y con el terreno
        this.physics.add.collider(this.enemyGroup, this.enemyGroup);
        this.physics.add.collider(this.enemyGroup, this.terrainLayer);
        this.physics.add.collider(this.playerGroup, this.terrainLayer);
        //testeo
        //this.physics.add.collider(this.playerGroup, this.enemyGroup);
    }

    //lee de la capa de entidades del tilemap los los jugadores y los crea.
    spawnPlayers(entityLayer) {
        
        // id del tile en el json
        const RANGE_TILE_ID = 5;
        const MELEE_TILE_ID = 6;
        let meleePlayerFound = false
        let rangePlayerFound = false

        entityLayer.forEachTile(tile => {
            if (tile.index === RANGE_TILE_ID && !rangePlayerFound) {
                // centrar tile en coordenadas del mundo
                const x = tile.getCenterX();
                const y = tile.getCenterY();
                
                //crea el jugador como objetos de esta escena, introduce la escena, el id del jugador, su posicion y sus controles        
                this.player1 = new RangedPlayer(this, 'player1', x, y, {
                    up: 'UP',
                    down: 'DOWN',
                    left: 'LEFT',
                    right: 'RIGHT',
                    interact: 'NUMPAD_ZERO',
                    healSelf: 'CTRL',
                    healOther: 'SHIFT'
                });
                rangePlayerFound = true;
            }
            if (tile.index === MELEE_TILE_ID && !meleePlayerFound) {
                // centrar tile en coordenadas del mundo
                const x = tile.getCenterX();
                const y = tile.getCenterY();

                // el jugador a Melee tiene controles adicionales para sus ataques
                this.player2 = new MeleePlayer(this, 'player2', x, y, {
                    up: 'W',
                    down: 'S',
                    left: 'A',
                    right: 'D',
                    interact: 'SPACE',
                    healSelf: 'Q',
                    healOther: 'F'
                }, {
                    attackUp: 'Y',
                    attackDown: 'H',
                    attackLeft: 'G',
                    attackRight: 'J'
                });
                meleePlayerFound = true;
            }
        });

        //añadir los jugadores a su grupo de físicas
        this.playerGroup.add(this.player1.sprite);
        this.playerGroup.add(this.player2.sprite);
        
    }

    //lee de la capa de entidades del tilemap los enemigos y los crea.
    spawnEnemies(entityLayer) {

        // id del tile en el json
        const TILE_ID = 7;
        let id = 0;
        entityLayer.forEachTile(tile => {
            if (tile.index === TILE_ID) {
                // centrar tile en coordenadas del mundo
                const x = tile.getCenterX();
                const y = tile.getCenterY();
                //crear nuevo enemigo
                let enemy = new Enemy(this, id++, x, y, this.pathfinder);
                this.enemies.push(enemy);
                //agregarlo al grupo de fisicas
                this.enemyGroup.add(enemy.sprite);
            }
        });

    }

    spawnObjects(objectLayer) {

        const LEVER_TILE_ID = 8;
        const MEDKIT_TILE_ID = 9;
        const ARMOR_TILE_ID = 10;

        objectLayer.forEachTile(tile => {
            if (tile.index === LEVER_TILE_ID) {
                // centrar tile en coordenadas del mundo
                const x = tile.getCenterX();
                const y = tile.getCenterY();
                //crear nuevo objeto
                let newObject = new InteractableObject(this, 'finish_level', x, y, 'lever', 1000, 1);
                //añadirlo a su grupo de físicas
                this.objectGroup.add(newObject.sprite);
            }
            if (tile.index === MEDKIT_TILE_ID) {
                // centrar tile en coordenadas del mundo
                const x = tile.getCenterX();
                const y = tile.getCenterY();
                //crear nuevo objeto
                let newObject = new PickableObject(this, 'medkit', x, y, 'medkit', 'medPack');
                //añadirlo a su grupo de físicas
                this.objectGroup.add(newObject.sprite);
            }
            if (tile.index === ARMOR_TILE_ID) {
                // centrar tile en coordenadas del mundo
                const x = tile.getCenterX();
                const y = tile.getCenterY();
                //crear nuevo objeto
                let newObject = new PickableObject(this, 'armor', x, y, 'armor', 'armourPiece');
                //añadirlo a su grupo de físicas
                this.objectGroup.add(newObject.sprite);
            }
        });

    }

    //cargar estado de guardado de los jugadores y aplicarlos
    loadPlayerState () {
        if (!this.playerSaveState) return;

        this.playerArray.forEach(p => {
            p.applySaveState(this.playerSaveState[p.id]);
        });

    }

    update(time, delta) {
        //revisa si los jugadores se estan tocando (para interactuar entre ellos)
        const playersTouching = this.physics.overlap(
            this.player1.sprite,
            this.player2.sprite
        );

        this.player1.touchingFriend = playersTouching;
        this.player2.touchingFriend = playersTouching;

        // revisa colisiones con objetos interactuables:
        this.player1.interactingObject = null;
        this.player2.interactingObject = null;
        
        this.physics.overlap(this.player1.sprite, this.objectGroup, (p, o) => {
            this.player1.touchingObject(o.getData('sceneObject'));
        });
        this.physics.overlap(this.player2.sprite, this.objectGroup, (p, o) => {
            this.player2.touchingObject(o.getData('sceneObject'));
        });
         
        // actualiza los jugadores
        this.player1.update(delta);
        this.player2.update(delta);
        this.enemies.forEach(enemy => {enemy.update(time, this.playerArray, delta)});
        
        // actualiza UI
        this.gameUI.update();

        //testeo de estado de derrota
        this.checkGameOver();
    }

    //Condición de victoria
    //Manejar los eventos de los objetos interactuables (por ahora sólo la palanca)
    handleEvents(id, player){

        //testeo de cambio de niveles
        console.log(player.id + ' ha movido la palanca: ' + id);
        //los dos tienen que estar cerca (tocándose) y vivos.
        /*
        if (this.player1.touchingFriend) {
            if (this.player1.lifeState !== 'Downed' || this.player2.lifeState !== 'Downed') {
                this.loadNextLevel();
                console.log("se cumplen las condiciones: siguiente nivel..");
            }

        }
        */
        this.loadNextLevel();
    }

    //Condición de derrota
    checkGameOver() {
        if (this.player1.lifeState !== 'Alive' && this.player2.lifeState !== 'Alive') 
            this.loadScene('GameOverScene', 2000, 200); //1: nombre de la escena, 2: tiempo de transición 3,4,5: nivel de color RGB de transición
    }
    
    //refactorizar para: recibir una variable q indique si cargar un nivel o escena, tiempo de fadeout
    loadNextLevel() {
        if (this.changingLevel) return; //para evitar llamar a la funcion varias veces
        this.changingLevel = true;

        const next = this.levelIndex + 1;

        // guardar el estado de los jugadores para pasarlos al reiniciar.
        const playerState = {};
        this.playerArray.forEach(p => {
            playerState[p.id] = p.getSaveState();
        });

        // transición al siguiente nivel
        this.cameras.main.fadeOut(400, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            if (next >= LEVELS.length) {
                //si no quedan niveles, se vuelve a la escena principal (o la de creditos)
                this.scene.start('VictoryScene');
            }
            else this.scene.restart({ levelIndex: next, playerState });
        });
    }

    //lamar a cualquier otra escena (útil para la pantalla de gameOver o victoria)
    loadScene(sceneName, transitionTime, R, G, B) {
        if (this.changingLevel) return; //para evitar llamar a la funcion varias veces
        this.changingLevel = true;

        this.cameras.main.fadeOut(transitionTime, R, G, B);
        this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start(sceneName);
        });
    }
}