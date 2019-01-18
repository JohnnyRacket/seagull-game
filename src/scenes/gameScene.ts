export class GameScene extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Sprite;
  private platforms;
  private cursors;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("cloud", "assets/pixelcloud.png");
    this.load.image("logo", "assets/logo.png");
    this.load.spritesheet("seagull", "assets/birdspritesheet.png", {
      frameWidth: 64,
      frameHeight: 48
    });
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(0, 0, "sky").setOrigin(0, 0);

    this.platforms = this.physics.add.staticGroup();

    this.platforms
      .create(400, 568, "cloud")
      .setScale(2)
      .refreshBody();

    this.platforms.create(600, 400, "cloud");
    this.platforms.create(50, 250, "cloud");
    this.platforms.create(750, 220, "cloud");

    this.player = this.physics.add.sprite(300, 450, "seagull");

    this.player.setBounce(1);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("seagull", { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("seagull", { start: 7, end: 13 }),
      frameRate: 10,
      repeat: -1
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-250);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(250);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-100);
    }

    if (this.player.body.velocity.x > 0) this.player.anims.play("right", true);
    else this.player.anims.play("left", true);
  }
}
