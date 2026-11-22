export class Enemy {

    constructor (scene, x, y) {
        this.health = 100;
        this.speed = 150;
        this.time2bite = 5.0;
        this.target = null;
        this.TCost = 5.0;

        //sprite del enemigo
        this.sprite = scene.physics.add.sprite(x, y, 'enemy');
        this.sprite.setDisplaySize(32, 32);
        this.sprite.setImmovable(false);
        this.sprite.setCollideWorldBounds(true);
    }

    update() {

        this.move();

    }

    move(target) {
        let velocityX = 0;
        let velocityY = 0;

        // Aplicar velocidad
        this.sprite.setVelocity(
            velocityX * this.speed,
            velocityY * this.speed
        );

    }

    chooseTarget(players) {

    }

    attack(player) {

    }

    takeDamage(dmg, dir) {
        this.health = this.health - dmg;
        if(this.health < 0){
            this.health = 0;
        }
        console.log(this.id + ' enemy_ouch: ' + this.health);

    }
}