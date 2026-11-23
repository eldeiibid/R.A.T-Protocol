import { SceneObjects } from "./SceneObjects";

export class InteractableObject extends SceneObjects {
  constructor(scene, id, x, y, texture, interactionTime, eventID) {
    super(scene, id, x, y, texture, false);

    this.interactionTime = interactionTime;
    this.eventID = eventID;
  }

  activate(player) {
    this.scene.handleEvents(this.eventID, player);
  }
}