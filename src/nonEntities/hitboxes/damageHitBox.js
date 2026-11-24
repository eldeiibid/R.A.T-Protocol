export class damageHitBox{
    constructor(scene, origin, duration){
        this.scene = scene;
        this.origin = origin;
        this.duration = duration;

        this.sprite = null;

        this.timer = scene.time.delayedCall(
            this.duration,
            () => this.destroy()
        );
    }

    destroy() {
        if (this.timer) this.timer.remove(false);
        if (this.collider) {
            this.collider.destroy();
            this.collider = null;
        }
        if (this.sprite) {
            this.sprite.destroy();
            this.sprite = null;
        }
    }
}