import { Player } from '../entities/Player';

export class RangedPlayer extends Player {
    constructor(scene, id, x, y, controls){
        super(scene, id, x, y, controls)
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
