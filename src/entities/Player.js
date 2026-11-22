export class Player {

    constructor(scene, id, controls) {
        this.health = 100;
        this.armour = 100;
        this.maxArmour = 100;
        this.wounds = 4;
        this.state = 'Alive';
        //this.items[5];
        this.id = id;
        this.scene = scene;
        this.speed = 200;

        // this.key devuelve la accion que las teclas han registrado,
        // en caso del RangedPlayer UP sera up, pero MeleePlayer W sera up
        this.key = scene.input.keyboard.addKeys({
            up: controls.up,
            down: controls.down,
            left: controls.left,
            right: controls.right,
            interact: controls.interact,
            healSelf: controls.healSelf,
            healOther: controls.healOther
        });
    }

    update() {
    }

    handleInput(input){

    }

    // el movimiento, al ser igual, no necesita de handleInput(), oye las teclas el mismo
    move(){
        let velocityX = 0;
        let velocityY = 0;

        // Leer input
        if (this.key.left.isDown) {
            velocityX = -1;
        }

        if (this.key.right.isDown) {
            velocityX = 1;
        }

        if (this.key.up.isDown) {
            velocityY = -1;
        }

        if (this.key.down.isDown) {
            velocityY = 1;
        }

        // Aplicar velocidad
        this.sprite.setVelocity(
            velocityX * this.speed,
            velocityY * this.speed
        );
    }
    // mueve el sprite y hitbox del jugador para que mire hacia unas coordenadas especificas
    lookAt(x, y){
        let deltaX = x - this.sprite.x;
        let deltaY = y - this.sprite.y;

        let alpha = Math.atan2(deltaY, deltaX);
        this.sprite.rotation = alpha;
    }
    cureSelf(){

    }
    cureFriend(player){

    }
    interactWith(object){

    }

    takeDamage(D){
        this.health = this.health - D;
        if(this.health < 0){
            this.health = 0;
        }
        console.log(this.id + ' ouch: ' + this.health)
    }
    fire(){

    }
}