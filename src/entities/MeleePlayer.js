import { Player } from '../entities/Player';
import { meleeHitBox } from '../nonEntities/hitboxes/meleeHitBox';

export class MeleePlayer extends Player {
    constructor(scene, id, x, y, controls, extracontrols){
        super(scene, id, x, y, controls)
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

        this.cooldown = 5;
    }

    update(){
        if(this.cooldown > 0){
            this.cooldown = this.cooldown - 1;
        }

        super.move();
        this.handleInput();
    }
    handleInput(){
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

    fire(x, y){
        let dir = {
            x: x,
            y: y
        };
        if(this.cooldown === 0){
            new meleeHitBox(
                this.scene,
                this,
                dir
            );
            this.cooldown = 5;
        }
    }
}
