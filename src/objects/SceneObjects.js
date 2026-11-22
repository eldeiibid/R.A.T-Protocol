export class SceneObjects {
    constructor(scene, x, y, dir){
        this.sprite = scene.physics.add.sprite(x, y, 'PLACEHOLDERIMG');
        this.sprite.setDisplaySize(32, 32);
        this.sprite.setImmovable(true);
    }
}