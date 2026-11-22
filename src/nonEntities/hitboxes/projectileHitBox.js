import { damageHitBox } from "./damageHitBox";

export class projectileHitBox extends damageHitBox{
    constructor(scene, origin, direction){
        super(scene, origin, 2000);

        this.speed = 600;
        this.sprite = scene.physics.add.sprite(origin.sprite.x, origin.sprite.y, 'PLACEHOLDERIMG');
        this.sprite.setDisplaySize(12, 12);
        this.sprite.setCollideWorldBounds(false);
        
        const mod = Math.hypot(direction.x, direction.y);
        //const mod = Math.SQRT2(direction.x + direction.y);

        const dirX = direction.x / mod;
        const dirY = direction.y / mod;
        this.sprite.setVelocity(dirX * this.speed, dirY * this.speed);

        scene.physics.add.collider(scene.player1, this, (a, ey) => {
            ey.destroy();
        });
        scene.physics.add.overlap(
            this.sprite,
            scene.player2,
            (bullet, enemy) => {
                enemy.getDamaged(this.damage);
                this.destroy();
            }
        );
    }
}