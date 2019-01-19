export class GameScene extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Sprite;
  private platforms;
  private cursors;
  private spacebar;
  private poopCooldown = 3;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("cloud", "assets/cloud_emoji.png");
    this.load.image("logo", "assets/logo.png");
    this.load.image("birdpoop", "assets/poop_emoji.png");
    this.load.image("seagull", "assets/bird_emoji.png");
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey("SPACE");
    this.add.image(0, 0, "sky").setOrigin(0, 0);

    // this.platforms = this.physics.add.group();
    // this.platforms
    //   .create(400, 568, "cloud")
    //   .setSize(140, 94)
    //   .setVelocityX(50);
    let cloud = this.physics.add.sprite(600, 400, "cloud").setSize(140, 94);
    cloud.setImmovable(true).setVelocityX(10);
    console.log("hi");
    //this.platforms.add(cloud);
    //this.platforms.create(50, 250, "cloud").setSize(140, 94);
    //this.platforms.create(750, 220, "cloud").setSize(140, 94);

    this.player = this.physics.add
      .sprite(300, 450, "seagull")
      .setOrigin(0.5)
      .setScale(0.5);

    this.player.setBounce(1);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, cloud);

    // this.anims.create({
    //   key: "right",
    //   frames: this.anims.generateFrameNumbers("seagull", { start: 0, end: 6 }),
    //   frameRate: 10,
    //   repeat: -1
    // });

    // this.anims.create({
    //   key: "left",
    //   frames: this.anims.generateFrameNumbers("seagull", { start: 7, end: 13 }),
    //   frameRate: 10,
    //   repeat: -1
    // });
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

    if (this.spacebar.isDown) {
      var poop = this.physics.add
        .sprite(this.player.x, this.player.y, "birdpoop")
        .setScale(0.2);
      poop.setVelocityY(300);
    }

    if (this.player.body.velocity.x > 0) this.player.flipX = true;
    // scaleX = -1;
    else this.player.flipX = false;
  }

  render() {}
}
