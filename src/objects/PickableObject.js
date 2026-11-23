import { SceneObjects } from "./SceneObjects";

export class PickableObject extends SceneObjects {
    constructor(scene, id, x, y, texture, item) {
        super(scene, id, x, y, texture, false);

        this.item = item;
    }

    interact(player) {
        const success = player.addItem(this.item);

        if (success) {
        this.destroy();
        }

        return success;
    }
}