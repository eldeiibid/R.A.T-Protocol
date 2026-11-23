import { PickableObject } from "../objects/PickableObject";

export class Player {

    constructor(scene, id, controls) {
        this.health = 100;
        this.armour = 100;
        this.maxArmour = 100;
        this.wounds = 4;
        this.items = [null, null, null, null, null];
        this.id = id;
        this.scene = scene;
        this.speed = 200;

        this.cooldown = 0;
        this.cooldownZero = 0;
        this.reloadTime = 0;
        this.reloading = false;

        this.touchingFriend = false;
        this.healSelfProgress = 2500;
        this.healFriendProgress = 1500;
        this.lifeState = 'Alive';
        this.actionState = 'Idle';

        this.interactionProgress = 0;
        this.interactingObject = null;

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

    update(delta) {
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
        //primero revisa si la vida necesita curacion y si no cura la armadura
        // falta checkear que tenga los items
        if (this.health < this.wounds * 25){
            this.health = Math.min(this.health + 25, this.wounds * 25);
            console.log('im so green ' + this.health);
        } else if(this.armour < this.maxArmour){
            this.armour = Math.min(this.armour + 25, this.maxArmour);
            console.log('im so grey ' + this.armour);
        }
    }
    cureFriend(player){        
        //primero revisa si la vida necesita curacion y si no cura la armadura
        // falta checkear que tenga los items
        if(player.lifeState === 'Downed'){
            player.health = player.wounds * 25;
            return;
        }

        if (player.health < player.wounds * 25 && this.hasItem('medPack')){
            player.health = Math.min(player.health + 25, player.wounds * 25);
            this.removeItem('medPack');
            console.log('im so green ' + player.health);
        } else if(player.armour < player.maxArmour  && this.hasItem('armourPiece')){
            player.armour = Math.min(player.armour + 25, player.maxArmour);
            this.removeItem('armourPiece');
            console.log('im so grey ' + player.armour);
        }
    }

    takeDamage(D){
        if(this.armour > 0){
            this.armour = this.armour - D;
            if (this.armour < 0){
                this.armour = 0;
            }
        } else{
            this.health = this.health - D;
            if(this.health < 0){
                this.health = 0;
            }
        }
        console.log(this.id + ' vida: ' + this.health + 'armour:' + this.armour);
    }

    //Items:
    // medPack
    // armourPiece
    addItem(item) {
        const slot = this.items.indexOf(null);

        if (slot != -1) {
            this.items[slot] = item;
            return true;
        }
        return false;
    }

    removeItem(item) {
        const slot = this.items.indexOf(item);

        if (slot != -1) {
            this.items[slot] = null;
            return true;
        }
        return false;
    }
    hasItem(item) {
        const slot = this.items.indexOf(item);
        return slot != -1;
    }

    touchingObject(object){
        this.interactingObject = object;
    }
    
    interactWith(object, delta){
        //console.log('paws at ' + object.id);

        //if (object.id === 'medPack' || object.id === 'armourPiece'){
        if(object instanceof PickableObject){
            object.interact(this);
        }
        else {
            if(this.interactionProgress >= object.interactionTime){
                object.activate(this);
            } else{
                this.interactionProgress += delta;
            }
        }
    }

    //lifeState:
    //'Alive': esta vivo
    //'Downed': derribado, puede ser levantado pero pierde una wound
    //'Dead': perdio la vida y las wounds, no puede ser reanimado

    //actionState:
    //'Idle': vivo, puede realizar acciones
    //'None': o esta Downed o Dead, no puede realizar acciones normales
    //'Reloading': esta recargando, puede moverse pero no interactuar
    //'HealingOther': esta curando al compañero, no puede hacer otra cosa
    //'HealingSelf': se esta curando, no puede hacer nada excepto curarse
    //'Interacting': esta interactuando con un objeto, no puede hacer otra cosa
    handleState(){
        // se tiene que implementar de forma individual en cada 
        if (this.health === 0){
            if(this.wounds === 0){
                this.lifeState = 'Dead';
                this.sprite.body.enable = false;
                this.sprite.setActive(false);
                this.sprite.setVisible(false);
                this.actionState = 'None';
            } else {
                if(this.lifeState === 'Alive'){
                    this.wounds--;
                }
                this.lifeState = 'Downed';
                this.speed = 25;
            }
        } else {
            this.lifeState = 'Alive';
            this.speed = 200;
        }

        if (this.healFriendProgress != 1500){
            this.actionState = 'HealingOther';
        } else if (this.healSelfProgress != 2500){
            this.actionState = 'HealingSelf';
        } else if(this.reloading) {
            this.actionState = 'Reloading';
        } else if(this.interactionProgress != 0){
            this.actionState = 'Interacting'
        } else {
            this.actionState = 'Idle';
        }
    }

    
}