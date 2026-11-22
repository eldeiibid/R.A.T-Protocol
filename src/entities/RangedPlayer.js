import { Player } from '../entities/Player';
import { projectileHitBox } from '../nonEntities/hitboxes/projectileHitBox';

export class RangedPlayer extends Player {
    constructor(scene, id, x, y, controls){
        super(scene, id, controls)
        this.cooldown = 250;
        
        //sprite del jugador
        this.sprite = scene.physics.add.sprite(x, y, 'rangePlayer');
        this.sprite.setDisplaySize(32, 32);
        this.sprite.setImmovable(false);
        this.sprite.setCollideWorldBounds(true);

        this.maxAmmo = 25;
        this.ammo = this.maxAmmo;
        this.reloadTimeZero = 2000;
        this.reloadTime = this.reloadTimeZero;

    }

    update(delta){
        if (this.cooldown > 0){
            this.cooldown -= delta;
        }
        super.move();
        this.handleInput(delta);
        // siempre estara mirando hacia el raton, aqui llamado pointer
        const pointer = this.scene.input.activePointer;
        super.lookAt(pointer.x, pointer.y);
    }
    handleInput(delta){
        //escucha al mousePointer de la escena (el raton)
        if (this.scene.input.mousePointer.leftButtonDown() && this.cooldown <= 0 && this.ammo > 0) {
        this.fire();
        }

        if (this.scene.input.mousePointer.middleButtonDown()) {
            this.reload();
        }
        //falta checkear items
        if(this.key.healOther.isDown && this.touchingFriend){
            this.healFriendProgress -= delta;
            if(this.healFriendProgress < 0){
                super.cureFriend(this.scene.player2);
                this.healFriendProgress = 1500;
            }
        } else{
            this.healFriendProgress = 1500;
        }
        if(this.key.healSelf.isDown){
            this.healSelfProgress -= delta;
            if(this.healSelfProgress < 0){
                super.cureSelf();
                this.healSelfProgress = 2500;
            }
        } else{
            this.healSelfProgress = 2500;
        }
    }
    fire(){
        this.cooldown = this.cooldownZero;
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
        this.ammo--;
    }

    reload(){
        this.ammo = this.maxAmmo;
    }
}
