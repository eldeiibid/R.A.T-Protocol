import Phaser from 'phaser';
import { RangedPlayer } from '../entities/RangedPlayer';
import { MeleePlayer } from '../entities/MeleePlayer';
import { Enemy } from '../entities/Enemy';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init() {
        this.players = new Map();
        this.inputMappings = [];
    }

    preload() {
        // Load assets
        this.load.image('PLACEHOLDERIMG', 'assets/images/thehi.jpg');
        this.load.image('rangePlayer', 'assets/images/rangePlayer.png');
        this.load.image('meleePlayer', 'assets/images/meleePlayer.png');
        this.load.image('enemy', 'assets/images/enemy.png');
        this.load.image('tiles', 'assets/images/tilemap.png')

        // Load Tile map
        this.load.tilemapTiledJSON('testmap', 'assets/maps/test_map.json');

        // Hit sound
        this.load.audio('hit', 'assets/audio/hit.mp3');

        // Background music
        this.load.audio('music', 'assets/audio/music.mp3');
    }

    create() {
       
        // Looping background music, Silenciada temporalmente por que es un AI SLOP
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

        // UI de los jugadores, placeholder
        this.scoreLeft = this.add.text(200, 50, 'P1', { fontSize: '48px' }).setOrigin(0.5);
        this.scoreRight = this.add.text(600, 50, 'P2', { fontSize: '48px' }).setOrigin(0.5);

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
        const map = this.make.tilemap({key: 'testmap', tileWidth: 32, tileHeight: 32}); //1:nombre del archivo json, 2:tamaño de tile
        const tileset = map.addTilesetImage('tileset', 'tiles'); //1: nombre del tileset en el archivo, 2: nombre del asset de la imagen con los tiles
        
        const terrainLayer = map.createLayer('terrainLayer', tileset, 0 , TILEMAP_YOFFSET); //1: nombre de la capa en el archivo,2: tileset, 3: las coordenadas en las que se empieza a dibujar
        terrainLayer.setCollisionBetween(2, 3); //id de los tiles en el archivo
        
        const entityLayer = map.createLayer('entityLayer', tileset, 0, TILEMAP_YOFFSET);
        //ocultar la capa para que no se puedan ver los tiles de guía
        entityLayer.setVisible(false);

        this.spawnPlayers(entityLayer, terrainLayer);
        //Crear array de enemigos, de pruebas, se debería hacer en otra funcion
        this.enemies = []
        this.spawnEnemies(entityLayer);

    }

    //lee de la capa de entidades del tilemap los los jugadores y los crea.
    spawnPlayers(entityLayer, terrainLayer) {
        
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
                    interact: ' ',
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

        //añadir colliders con el tilemap
        this.physics.add.collider(this.player1.sprite, terrainLayer);
        this.physics.add.collider(this.player2.sprite, terrainLayer);
        
    }

    //lee de la capa de entidades del tilemap los enemigos y los crea.
    spawnEnemies(layer) {

        // id del tile en el json
        const TILE_ID = 7;
        
        layer.forEachTile(tile => {
            if (tile.index === TILE_ID) {
                // centrar tile en coordenadas del mundo
                const x = tile.getCenterX();
                const y = tile.getCenterY();
                //crear nuevo enemigo
                this.enemies.push(new Enemy(this, x, y)); 
                //añadir colision con el terreno || TEST
                //this.physics.add.collider(enemy.sprite, layer); 
            }
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

        // actualiza los jugadores
        this.player1.update(delta);
        this.player2.update(delta);
        this.enemies.forEach(enemy => {enemy.update()});
    }
}
