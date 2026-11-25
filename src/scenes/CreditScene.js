import Phaser from 'phaser';

export class CreditScene extends Phaser.Scene {
    constructor() {
        super('CreditScene');
    }

    create() {
        this.add.text(400, 150, 'R.A.T Protocol', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);
        this.add.text(400, 250, 'Design, programming and mapmaking:\nALEJANDRO CUAXILOA DEL CAMPO & DAVID BENÍTEZ VÁZQUEZ ', {
            fontSize: '20px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(400, 325, 'Art, audio and music:\n DANIEL BORGES CANO & JAVIER BORRIÑO CARNERERO ', {
            fontSize: '20px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        const localBtn = this.add.text(400, 400, 'Main menu', {
            fontSize: '32px',
            color: '#00ff00'
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => localBtn.setStyle({ color: '#ffff00' }))
            .on('pointerout', () => localBtn.setStyle({ color: '#00ff00' }))
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}