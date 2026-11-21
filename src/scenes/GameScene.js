import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { RangedPlayer } from '../entities/RangedPlayer';
import { MeleePlayer } from '../entities/MeleePlayer';

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
        this.load.image('player', 'assets/images/paddle.png')

        // Hit sound
        this.load.audio('hit', 'assets/audio/hit.mp3');

        // Background music
        this.load.audio('music', 'assets/audio/music.mp3');
    }

    create() {
        // Looping background music
        this.music = this.sound.add('music', { loop: true, volume: 0.3 });
        this.music.play();

        // Pause/resume the music with the scene and stop it on exit
        this.events.on('pause', () => this.music.pause());
        this.events.on('resume', () => this.music.resume());
        this.events.once('shutdown', () => {
            this.events.off('pause');
            this.events.off('resume');
            this.music.destroy();
        });

        // Add mid line
        for (let i = 0; i < 12; i++) {
            this.add.rectangle(400, i * 50 + 25, 10, 30, 0x666666);
        }

        // Scores
        this.scoreLeft = this.add.text(200, 50, '0', { fontSize: '48px' }).setOrigin(0.5);
        this.scoreRight = this.add.text(600, 50, '0', { fontSize: '48px' }).setOrigin(0.5);

        // Collisions on all sides 
        this.physics.world.setBoundsCollision(true, true, true, true);

        // Setup players
        this.setUpPlayers();

        // Pause with ESC and show the pause menu on top
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseScene');
        });
    }

    setUpPlayers() {
        //crea los jugadores como objetos de esta escena, introduce la escena, el id del jugador, su posicion y sus controles        
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

        //Setup collisions
        this.physics.add.collider(this.player1.sprite, this.player2.sprite);

        // Crear grupo estático de plataformas: Se debería hacer en otra función pero es para probar
        let plataformas = this.physics.add.staticGroup();
        // Añadir plataformas
        plataformas.create(400, 568, 'suelo')
            .setScale(2)
            .refreshBody();  // Actualizar tras modificar
        
        plataformas.create(600, 400, 'suelo');
        plataformas.create(50, 250, 'suelo');

        // Colisión con todas
        this.physics.add.collider(this.player1.sprite, plataformas);
        this.physics.add.collider(this.player2.sprite, plataformas);
    }

    update(time, delta) {
        // actualiza los jugadores
        this.player1.update();
        this.player2.update();
    }
}
