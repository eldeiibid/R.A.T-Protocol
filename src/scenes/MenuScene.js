import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    preload() {
        this.load.image('logo', 'assets/images/logo.png');
    }

    create() {
        this.title = this.add.image(400,150, 'logo').setOrigin(0.5);
        this.title.setScale(0.25);

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
