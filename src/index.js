import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { PauseScene } from './scenes/PauseScene.js';
import { CreditScene } from './scenes/CreditScene.js';
import { GuideScene } from './scenes/GuideScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { VictoryScene } from './scenes/VictoryScene.js';

const config = {
    type: Phaser.AUTO,      // WebGL if available; otherwise, Canvas
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MenuScene, GameScene, PauseScene, CreditScene, GuideScene, GameOverScene, VictoryScene]      // The first scene starts automatically
};

const game = new Phaser.Game(config);
