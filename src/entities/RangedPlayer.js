import { Player } from '../entities/Player';
import { projectileHitBox } from '../nonEntities/hitboxes/projectileHitBox';

export class RangedPlayer extends Player {
    constructor(scene, id, x, y, controls){
        this.cooldown = 5;
        super(scene, id, controls)
        
        //sprite del jugador
        this.sprite = scene.physics.add.sprite(x, y, 'rangePlayer');
        this.sprite.setDisplaySize(32, 32);
        this.sprite.setImmovable(false);
        this.sprite.setCollideWorldBounds(true);
    }

    update(){
        if (this.cooldown > 0){
            this.cooldown = this.cooldown - 1;
        }
        super.move();
        this.handleInput();
        // siempre estara mirando hacia el raton, aqui llamado pointer
        const pointer = this.scene.input.activePointer;
        super.lookAt(pointer.x, pointer.y);
    }
    handleInput(){
        //escucha al mousePointer de la escena (el raton)
        if (this.scene.input.mousePointer.leftButtonDown() && this.cooldown === 0) {
        this.fire();
        }

        if (this.scene.input.mousePointer.rightButtonDown()) {
        this.reload();
        }
        if(this.key.healOther.isDown){
        }
    }
    fire(){
        this.cooldown = 5;
        const pointer = this.scene.input.activePointer;
        const dir = {
            x: pointer.x - this.sprite.x,
            y: pointer.y - this.sprite.y
        };

        new projectileHitBox(
            this.scene,
            this,
            dir
        );
    }

    reload(){
        
    }
}
