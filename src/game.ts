import { Application, Texture } from 'pixi.js';
import { Background } from './background';
import { Dragon } from './dragon';
import { Score } from './score';

export class Game {
  background: Background;
  private dragons: Dragon[];
  score: Score;

  constructor(app: Application, dragonPositions: { x: number; y: number }[], numberOfDragons: number) {
    const cloudsTexture: Texture = Texture.from("clouds");
    this.background = new Background(app, cloudsTexture);

    const textures: Texture[] = [];
    for (let i = 1; i < 13; i++) {
      const texture: Texture = Texture.from(`drag${i}.png`);
      textures.push(texture);
    }

    this.dragons = dragonPositions.slice(0, numberOfDragons).map(position => {
      const dragon = new Dragon(app, textures, position);
      dragon.sprite.on('pointerdown', () => {
        if (dragon.sprite.visible) {
          dragon.dragonDead();
          const aliveDragons = this.dragons.filter(d => d.sprite.visible).length;
          this.score.updateScore(aliveDragons, 10 - aliveDragons);
        }
      });
      return dragon;
    });

    this.score = new Score(app);

    app.ticker.add(this.background.update);
    app.ticker.add(() => this.update(app));
  }

  update = (app: Application) => {
    this.dragons.forEach(dragon => {
      dragon.update(app);
    });
  };
}
