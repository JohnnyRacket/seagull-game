export class Bird extends Phaser.GameObjects.Sprite {
  private cursors: CursorKeys;
  private spacebar: Phaser.Input.Keyboard.Key;
  private poopCooldown = 3;
  private isDead: boolean = false;

  public getDead(): boolean {
    return this.isDead;
  }

  public setDead(dead): void {
    this.isDead = dead;
  }

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // image

    // physics
    params.scene.physics.world.enable(this);
    this.body.setBounce(1);
    this.body.setCollideWorldBounds(true);
    this.setScale(0.5);
    this.setOrigin(0.5);
    this.body.setVelocityY(-100);
    this.body.setVelocityX(250);

    // input
    this.cursors = params.scene.input.keyboard.createCursorKeys();
    this.spacebar = params.scene.input.keyboard.addKey("SPACE");

    params.scene.add.existing(this);
  }

  update(): void {
    this.handleInput();
    this.handleDirection();
  }

  handleDirection(): void {
    if (this.body.velocity.x > 0) this.flipX = true;
    else this.flipX = false;
  }

  private handleInput(): void {
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-250);
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(250);
    }

    if (this.spacebar.isDown) {
      var poop = this.scene.physics.add
        .sprite(this.x, this.y, "birdpoop")
        .setScale(0.2);
      poop.setVelocityY(300);
    }
  }
}
