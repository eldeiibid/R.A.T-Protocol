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
        this.load.tilemapTiledJSON('testmap', 'assets/maps/test.json');

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

        // Collisions on all sides 
        this.physics.world.setBoundsCollision(true, true, true, true);

        // Setup almost everything
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

        //1º crear mapa de tilemap, set de tiles y capa de tiles
        const map = this.make.tilemap({key: 'testmap', tileWidth: 32, tileHeight: 32}); //1:nombre del archivo json, 2:tamaño de tile
        const tileset = map.addTilesetImage('tileset', 'tiles'); //1: nombre del tileset en el archivo, 2: nombre del asset de la imagen con los tiles
        const layer = map.createLayer('layer1', tileset, 0 , 24); //1: nombre de la capa en el archivo,2: tileset, 3: las coordenadas en las que se empieza a dibujar

        //2º crea los jugadores como objetos de esta escena, introduce la escena, el id del jugador, su posicion y sus controles        
        this.player1 = new RangedPlayer(this, 'player1', 50, 300, {
            up: 'UP',
            down: 'DOWN',
            left: 'LEFT',
            right: 'RIGHT',
            interact: 'NUMPAD_ZERO',
            healSelf: 'CTRL',
            healOther: 'SHIFT'
        });
        // el jugador a Melee tiene controles adicionales para sus ataques
        this.player2 = new MeleePlayer(this, 'player2', 750, 300, {
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

        //3º Crear a los enemigos, de pruebas, se debería hacer en otra funcion
        this.enemy = new Enemy(this, 100, 100);

        //4º añadir colliders con el tilemap
        layer.setCollisionBetween(2, 3); //id de los tiles en el archivo
        this.physics.add.collider(this.player1.sprite, layer);
        this.physics.add.collider(this.player2.sprite, layer);
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
    }
}
