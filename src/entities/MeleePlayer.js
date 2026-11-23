import { Player } from '../entities/Player';
import { meleeHitBox } from '../nonEntities/hitboxes/meleeHitBox';

export class MeleePlayer extends Player {
    constructor(scene, id, x, y, controls, extracontrols){
        super(scene, id, controls)

        //sprite del jugador
        this.sprite = scene.physics.add.sprite(x, y, 'meleePlayer');
        this.sprite.setDisplaySize(32, 32);
        this.sprite.setImmovable(false);
        this.sprite.setCollideWorldBounds(true);

        // MeleePlayer tiene extracontrols para registrar sus controles adicionales para atacar hacia los lados
        this.key = scene.input.keyboard.addKeys({
            up: controls.up,
            down: controls.down,
            left: controls.left,
            right: controls.right,
            interact: controls.interact,
            healSelf: controls.healSelf,
            healOther: controls.healOther,
            attackUp: extracontrols.attackUp,
            attackDown: extracontrols.attackDown,
            attackLeft: extracontrols.attackLeft,
            attackRight: extracontrols.attackRight
        });

        this.cooldownZero = 250;
        this.cooldown = this.cooldownZero;
    }

    update(delta){
        super.handleState();

        if(this.cooldown > 0){
            this.cooldown -= delta;
        }

        if (this.actionState === 'Idle'){
            super.move();
        }
        if (this.lifeState === 'Alive'){
            this.handleInput(delta);
        }
    }
    handleInput(delta){
        
        if(this.actionState === 'Idle'){
            //al presionar una tecla hara que mire hacia lookX y lookY
            // lookX y lookY empiezan como la misma posicion del jugador
            let lookX = this.sprite.x;
            let lookY = this.sprite.y;
            //si ataca hacia arriba tendra que mirar hacia arriba, para eso lookY se resta 10, ahora lookX es la misma X que el jugador
            // pero look Y esta un poco por arriba, asi que al llamar a lookAt estara mirando a un punto justo encima suya
            if(this.key.attackUp.isDown){
                lookY = this.sprite.y - 30;
            }
            if(this.key.attackDown.isDown){
                lookY = this.sprite.y + 30;
            }
            if(this.key.attackLeft.isDown){
                lookX = this.sprite.x - 30;
            }
            if(this.key.attackRight.isDown){
                lookX = this.sprite.x + 30;
            }
            //se que esto es un poco feo pero es la unica forma que se me ocurre de hacer que fire() pueda apuntar perpendicularmente
            if(this.key.attackUp.isDown || this.key.attackDown.isDown || this.key.attackLeft.isDown || this.key.attackRight.isDown){
                super.lookAt(lookX, lookY);
                this.fire(lookX, lookY);
            }
            //al llamar siempre a lookAt(lookX, lookY) si presiona dos teclas cambiaran ambos lookX y lookY
            // y podra mirar de forma perpendicular
        }
        
        const canCureFriend = ((this.scene.player1.health < this.scene.player1.wounds * 25) && this.hasItem('medPack'))
        || ((this.scene.player1.armour < this.scene.player1.maxArmour) && this.hasItem('armourPiece'))
        || (this.scene.player1.lifeState === 'Downed');
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

        //if(this.key.healOther.isDown){
        //   super.takeDamage(1);
        //}
        
        const canCureSelf = ((this.health < this.wounds * 25) && this.hasItem('medPack'))
        || ((this.armour < this.maxArmour) && this.hasItem('armourPiece'));
        if(this.key.healSelf.isDown
            && canCureSelf && (this.actionState === 'Idle' || this.actionState === 'HealingSelf')){
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

    fire(x, y){
        let dir = {
            x: x,
            y: y
        };
        if(this.cooldown <= 0){
            new meleeHitBox(
                this.scene,
                this,
                dir
            );
            this.cooldown = this.cooldownZero;
        }
    }
}
