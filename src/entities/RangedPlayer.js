import { Player } from '../entities/Player';

export class RangedPlayer extends Player {
    constructor(scene, id, x, y, controls){
        super(scene, id, controls)
        
        //sprite del jugador
        this.sprite = scene.physics.add.sprite(x, y, 'rangePlayer');
        this.sprite.setDisplaySize(32, 32);
        this.sprite.setImmovable(false);
        this.sprite.setCollideWorldBounds(true);
    }

    update(){
        super.move();
        this.handleInput();
        // siempre estara mirando hacia el raton, aqui llamado pointer
        const pointer = this.scene.input.activePointer;
        super.lookAt(pointer.x, pointer.y);
    }
    handleInput(){
        //escucha al mousePointer de la escena (el raton)
        if (this.scene.input.mousePointer.leftButtonDown()) {
        this.fire();
        }

        if (this.scene.input.mousePointer.rightButtonDown()) {
        this.reload();
        }
        if(this.key.healOther.isDown){
        }
    }
    fire(){
        
    }

    reload(){
        
    }
}
