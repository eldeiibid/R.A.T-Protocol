export class UIElement {
    constructor(scene, x, y, img){
        this.element = scene.add.sprite(
            x, y,
            img
        );
        this.element.setOrigin(0, 0);
        //this.element.displayHeight = 40;
        //this.element.displayWidth = 40;
    }
    turnOn(active){
        this.element.setVisible(active);
    }
    setSprite(sprite){
        this.element.setTexture(sprite);
    }
}