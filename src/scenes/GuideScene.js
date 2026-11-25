import Phaser from 'phaser';

export class GuideScene extends Phaser.Scene {
    constructor() {
        super('GuideScene');
    }

    create() {
        this.add.rectangle(400, 300, 800, 600, 0x000000, 1);

        this.add.text(400, 100, 'How to play', { fontSize: '64px' }).setOrigin(0.5);

        this.add.text(200, 150, 'PLAYER 1:\nDirection arrows - move.\nLeft click - shoot\nMiddle click - reload\nNumpad 0 - interact\nCtrl - heal self\nShift - heal friend/stabilize', { fontSize: '16px', color: '#8800ea'})
            .setOrigin(0.5, 0);
        this.add.text(600, 150, 'PLAYER 2:\nWASD - move.\nYGHJ - attack\n\nSpace - interact\nQ - heal self\nF - heal friend/stabilize', { fontSize: '16px'})
            .setOrigin(0.5, 0);
        this.add.text(400, 300, 'Shoot the rats until they all die.\nPick up med packs and armour pieces to heal each other.\nIf you are downed, you can still be stabilized by your friend.\nEach time you are stabilized you lose 1/4 of your maximum health.\nBeing downed a fourth time kills you.\nIf one of you dies, or both are downed you lose.\nReach each level to complete the level', {font: '16px', align:'center'}).setOrigin(0.5, 0)

        const pauseBtn = this.add.text(400, 500, 'Back', { fontSize: '32px', color: '#00ff00' }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => pauseBtn.setStyle({ color: '#ffff00' }))
            .on('pointerout', () => pauseBtn.setStyle({ color: '#00ff00' }))
            .on('pointerdown', () => {
                this.scene.stop();
                this.scene.start('PauseScene');
            });
    }
}