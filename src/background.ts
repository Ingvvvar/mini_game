import { Application, TilingSprite, Texture } from 'pixi.js';

export class Background {
  sprite: TilingSprite;

  constructor(app: Application, texture: Texture) {
    this.sprite = new TilingSprite(texture, app.screen.width, app.screen.height);
    this.sprite.tileScale.set(0.5, 0.5);
    app.stage.addChild(this.sprite);
  }

  update = () => {
    this.sprite.tilePosition.x += 1;
  };
}
