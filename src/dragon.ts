import { AnimatedSprite, Application, Texture } from 'pixi.js';

export class Dragon {
  sprite: AnimatedSprite;
  initialY: number;
  amplitude: number = 50;
  frequency: number = 0.01;
  speed: number;

  constructor(app: Application, textures: Texture[], position: { x: number; y: number }) {
    this.sprite = new AnimatedSprite(textures);
    this.sprite.x = app.screen.width * position.x;
    this.sprite.y = app.screen.height * position.y;
    this.sprite.animationSpeed = 0.2;
    this.sprite.scale.set(0.75 + Math.random() * 0.5);
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.play();
    app.stage.addChild(this.sprite);

    this.initialY = this.sprite.y;
    this.speed = 1 + Math.random() * 3;
  }

  dragonDead = () => {
    this.sprite.visible = false;
  }

  resetPosition = (app: Application) => {
    this.sprite.x = app.screen.width + Math.random() * app.screen.width;
    this.sprite.y = Math.random() * (app.screen.height - this.sprite.height);
    this.initialY = this.sprite.y;
  }

  update = (app: Application) => {
    this.sprite.position.x -= this.speed;
    this.sprite.position.y = this.initialY + this.amplitude * Math.sin(this.frequency * this.sprite.position.x);

    if (this.sprite.position.x < -this.sprite.width) {
      this.resetPosition(app);
    }
  };
}
