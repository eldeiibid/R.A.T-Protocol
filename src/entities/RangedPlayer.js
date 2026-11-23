import { Player } from '../entities/Player';
import { projectileHitBox } from '../nonEntities/hitboxes/projectileHitBox';

export class RangedPlayer extends Player {
    constructor(scene, id, x, y, controls){
        super(scene, id, controls)
        
        //sprite del jugador
        this.sprite = scene.physics.add.sprite(x, y, 'rangePlayer');
        this.sprite.setDisplaySize(32, 32);
        this.sprite.setImmovable(false);
        this.sprite.setCollideWorldBounds(true);

        this.cooldownZero = 250;
        this.cooldown = this.cooldownZero;
        this.maxAmmo = 25;
        this.ammo = this.maxAmmo;
        this.reloadTime = 2000;

    }

    update(delta){
        super.handleState();

        if (this.cooldown > 0){
            this.cooldown -= delta;
        }
        if (this.actionState === 'Idle' || this.actionState === 'Reloading'){
            super.move();
        }

        if (this.lifeState === 'Alive'){
            this.handleInput(delta);
        }
        // siempre estara mirando hacia el raton, aqui llamado pointer
        const pointer = this.scene.input.activePointer;
        super.lookAt(pointer.x, pointer.y);
    }
    handleInput(delta){
        //escucha al mousePointer de la escena (el raton)
        if (this.scene.input.mousePointer.leftButtonDown() && this.cooldown <= 0 && this.ammo > 0 && this.actionState === 'Idle') {
        this.fire();
        }

        if (this.scene.input.mousePointer.middleButtonDown() && this.actionState === 'Idle') {
            this.reload();
        }

        const canCureFriend = ((this.scene.player2.health < this.scene.player2.wounds * 25) && this.hasItem('medPack'))
        || ((this.scene.player2.armour < this.scene.player2.maxArmour) && this.hasItem('armourPiece'));
        if(this.key.healOther.isDown && this.touchingFriend
            && canCureFriend && (this.actionState === 'Idle' || this.actionState === 'HealingOther')){
            this.healFriendProgress -= delta;
            if(this.healFriendProgress < 0){
                super.cureFriend(this.scene.player2);
                this.healFriendProgress = 1500;
            }
        } else{
            this.healFriendProgress = 1500;
        }
        const canCureSelf = ((this.health < this.wounds * 25) && this.hasItem('medPack'))
        || ((this.armour < this.maxArmour) && this.hasItem('armourPiece'));
        if(this.key.healSelf.isDown
            && canCureSelf && (this.actionState === 'Idle' || this.actionState === 'HealingSelf')
            && this.hasItem('medPack')){
            this.healSelfProgress -= delta;
            if(this.healSelfProgress < 0){
                super.cureSelf();
                this.healSelfProgress = 2500;
            }
        } else{
            this.healSelfProgress = 2500;
        }

        if(this.key.interact.isDown && this.interactingObject != null &&
            (this.actionState === 'Idle' || this.actionState === 'Interacting')){
            super.interactWith(this.interactingObject, delta);
        } else{
            this.interactionProgress = 0;
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
        this.reloading = true;
        this.scene.time.delayedCall(this.reloadTime, () =>{
            if(this.lifeState === 'Alive'){
                this.ammo = this.maxAmmo;
                this.reloading = false;
            }
        })
    }
}
