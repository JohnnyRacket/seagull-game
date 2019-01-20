export class Cloud extends Phaser.GameObjects.Sprite {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // image

    // physics
    params.scene.physics.world.enable(this);
    this.body.setSize(140, 94);
    params.scene.add.existing(this);
  }

  update(): void {}

  checkIfOutOfBounds() {
    return this.x > 600;
  }
}
