import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {

        this.cameras.main.fadeIn(400, 200);

        this.add.text(400, 150, 'Game Over!', {
            fontSize: '64px',
            color: '#c80000'
        }).setOrigin(0.5);

        this.add.text(400, 200, 'Both players were knocked...', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const retryBtn = this.add.text(400, 300, 'Try Again', { fontSize: '32px', color: '#00ff00' }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => retryBtn.setStyle({ color: '#ffff00' }))
            .on('pointerout', () => retryBtn.setStyle({ color: '#00ff00' }))
            .on('pointerdown', () => {
                this.scene.stop();
                this.scene.start('GameScene');
            });

        const quitBtn = this.add.text(400, 350, 'Quit to Title', { fontSize: '32px', color: '#00ff00' }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => quitBtn.setStyle({ color: '#ffff00' }))
            .on('pointerout', () => quitBtn.setStyle({ color: '#00ff00' }))
            .on('pointerdown', () => {
                this.scene.stop();
                this.scene.start('MenuScene');
            });


    }
}