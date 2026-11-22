import { damageHitBox } from "./damageHitBox";

export class meleeHitBox extends damageHitBox{
    constructor(scene, origin, position){
        super(scene, origin, 100);

        this.sprite = scene.add.zone(position.x, position.y, 64, 64);

        scene.physics.add.existing(this.sprite);

        this.sprite.body.setAllowGravity(false);
        this.sprite.body.setImmovable(true);
    }
}