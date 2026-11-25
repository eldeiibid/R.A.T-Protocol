import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        this.add.text(400, 150, 'R.A.T Protocol', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        
        const localBtn = this.add.text(400, 320, 'Local Play', {
            fontSize: '32px',
            color: 'red'
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => localBtn.setStyle({ color: '#ffff00' }))
            .on('pointerout', () => localBtn.setStyle({ color: 'red' }))
            .on('pointerdown', () => this.scene.start('GameScene', {levelIndex: 0}));

        const creditBtn = this.add.text(400, 400, 'Credits', {
            fontSize: '32px',
            color: 'red'
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => creditBtn.setStyle({ color: '#ffff00' }))
            .on('pointerout', () => creditBtn.setStyle({ color: 'red' }))
            .on('pointerdown', () => this.scene.start('CreditScene'));
    }
}
