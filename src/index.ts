import { AnimatedSprite, Application, Texture, TilingSprite, Text } from 'pixi.js'

const app = new Application({
  view: document.getElementById("canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  antialias: true,
  backgroundColor: 0x6495ed,
  width: window.innerWidth,
  height: window.innerHeight
});

class Background {
  sprite: TilingSprite;

  constructor(texture: Texture) {
    this.sprite = new TilingSprite(texture, app.screen.width, app.screen.height);
    this.sprite.tileScale.set(0.5, 0.5);
    app.stage.addChild(this.sprite);
  }

  update = () => {
    this.sprite.tilePosition.x += 1;
  };
}

class Dragon {
  sprite: AnimatedSprite;
  initialY: number;
  amplitude: number = 50;
  frequency: number = 0.01;
  speed: number;

  constructor(textures: Texture[], position: { x: number; y: number }) {
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

  resetPosition = () => {
    this.sprite.x = app.screen.width + Math.random() * app.screen.width;
    this.sprite.y = Math.random() * (app.screen.height - this.sprite.height);
    this.initialY = this.sprite.y;
  }

  update = () => {
    this.sprite.position.x -= this.speed;
    this.sprite.position.y = this.initialY + this.amplitude * Math.sin(this.frequency * this.sprite.position.x);

    if (this.sprite.position.x < -this.sprite.width) {
      this.resetPosition();
    }
  };
}

class Score {
  dragonsAliveText: Text;
  dragonsKilledText: Text;

  constructor() {
    this.dragonsAliveText = new Text('Dragons alive 10');
    this.dragonsKilledText = new Text('Dragons killed 0');
    this.dragonsKilledText.y = 50;
    app.stage.addChild(this.dragonsAliveText, this.dragonsKilledText);
  }

  updateScore(value: number, res: number) {
    this.dragonsAliveText.text = value === 0 ? 'GAME OVER' : `Dragons alive ${value}`;
    this.dragonsKilledText.text = value === 0 ? 'YOU KILLED EVERYONE' : `Dragons killed ${res}`;
  
    if (value === 0) {
      this.showRestartButton();
    }
  }

  showRestartButton() {
    const restartButton = new Text('RESTART');
    restartButton.interactive = true;
    restartButton.buttonMode = true;
    restartButton.x = (app.screen.width - restartButton.width) / 2;
    restartButton.y = app.screen.height / 2;

    restartButton.on('pointerdown', () => {
      window.location.reload();
    });

    app.stage.addChild(restartButton);
  }
}

class Game {
  background: Background;
  private dragons: Dragon[];
  score: Score;

  constructor(dragonPositions: { x: number; y: number }[], numberOfDragons: number) {
    const cloudsTexture: Texture = Texture.from("clouds");
    this.background = new Background(cloudsTexture);

    const textures: Texture[] = [];
    for (let i = 1; i < 13; i++) {
      const texture: Texture = Texture.from(`drag${i}.png`);
      textures.push(texture);
    }

    this.dragons = dragonPositions.slice(0, numberOfDragons).map(position => {
      const dragon = new Dragon(textures, position);
      dragon.sprite.on('pointerdown', () => {
        if (dragon.sprite.visible) {
          dragon.dragonDead();
          const aliveDragons = this.dragons.filter(d => d.sprite.visible).length;
          this.score.updateScore(aliveDragons, 10 - aliveDragons);
        }
      });
      return dragon;
    });

    this.score = new Score();

    app.ticker.add(this.background.update);
    app.ticker.add(this.update);
  }

  update = () => {
    this.dragons.forEach(dragon => {
      dragon.update();
    });
  };
}

app.loader
  .add("dragon", "drags.json")
  .add('clouds', "clouds.png")
  .add("dragons_data", "dragons_data.json")
  .load((_, resources) => {
    const dragonPositions = resources.dragons_data.data.dragons;
    const numberOfDragons = resources.dragons_data.data.numberOfDragons;
    new Game(dragonPositions, numberOfDragons);
  });
