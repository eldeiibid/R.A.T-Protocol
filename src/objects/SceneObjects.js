export class SceneObjects {
    constructor(scene, id, x, y, texture, solid = false) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(
      x, y, texture
    );
    this.sprite.setDisplaySize(32, 32);
    this.sprite.setImmovable(true);
    this.sprite.body.setAllowGravity(false);

    // Guarda una referencia a la instancia
    this.sprite.setData('sceneObject', this);

    
    this.solid = solid;
    if (solid) {
        scene.physics.add.collider(
            scene.player1.sprite,
            this.sprite
        );

        scene.physics.add.collider(
            scene.player2.sprite,
            this.sprite
        );
    }
    
    this.sprite.setData('sceneObject', this);
    this.id = id;
  }

  destroy() {
    this.sprite.destroy();
  }

}