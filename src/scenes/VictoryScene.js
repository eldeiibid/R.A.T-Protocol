import Phaser from 'phaser';

export class VictoryScene extends Phaser.Scene {
    constructor() {
        super('VictoryScene');
    }

    create() {
        this.add.text(400, 150, 'Congratulations!', {
            fontSize: '64px',
            color: '#00d5ff'
        }).setOrigin(0.5);

        this.add.text(400, 200, 'You have passed all the floors!', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const creditBtn = this.add.text(400, 400, 'See the credits', {
            fontSize: '32px',
            color: '#eaff00'
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => creditBtn.setStyle({ color: '#00fb08' }))
            .on('pointerout', () => creditBtn.setStyle({ color: '#eaff00' }))
            .on('pointerdown', () => this.scene.start('CreditScene'));
    }
}
