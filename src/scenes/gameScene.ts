import { Bird } from "../objects/player";
import { Cloud } from "../objects/cloud";
import { Physics } from "phaser";

export class GameScene extends Phaser.Scene {
  private player: Bird;
  private clouds: Physics.Arcade.Group;

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
    this.load.image("bird", "assets/bird_emoji.png");
  }

  create() {
    this.add.image(0, 0, "sky").setOrigin(0, 0);

    this.clouds = this.physics.add.group();
    this.player = new Bird({ x: 300, y: 300, key: "bird", scene: this });
    this.physics.add.collider(this.player, this.clouds);
  }

  update() {
    this.player.update();
    this.randomlyCreateClouds();
    this.cullClouds();
  }

  render() {}

  cullClouds() {
    this.clouds.getChildren().forEach(cloud => {
      if (cloud.body.x > 800) {
        this.clouds.killAndHide(cloud);
        cloud.destroy();
      }
    });
  }

  randomlyCreateClouds() {
    let rng = Math.random() * 10000;
    if (rng > 9990) {
      let cloud = new Cloud({
        x: 0,
        y: Math.random() * 600,
        key: "cloud",
        scene: this,
        velocityX: Math.random() * 25
      });

      this.clouds.add(cloud);
      cloud.setScale(Math.random());
      cloud.body.immovable = true;
      cloud.body.velocity.x = Math.random() * 35 + 5;
    }
  }
}
