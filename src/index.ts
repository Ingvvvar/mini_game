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

app.renderer.view.style.position = 'absolute';

const cloudsTexture: Texture = Texture.from("clouds.png");
const cloudsSprite: TilingSprite = new TilingSprite(
  cloudsTexture,
  app.screen.width,
  app.screen.height
)
cloudsSprite.tileScale.set(0.5, 0.5);
app.ticker.add(() => cloudsSprite.tilePosition.x += 1);
app.stage.addChild(cloudsSprite);

app.loader.add("dragon", "drags.json")
  .load(runGame);

function runGame() {
  const textures = [];
  for (let i = 1; i < 13; i++) {
    const texture: Texture = Texture.from(`drag${i}.png`);
    textures.push(texture);
  }

  let value = 10;
  let res = 0;

  for (let i = 0; i < value; i++) {
    const drag = new AnimatedSprite(textures);
    drag.x = app.screen.width + Math.random() * app.screen.width;
    drag.y = Math.random() * app.screen.height;
    drag.animationSpeed = 0.2;
    drag.scale.set(0.75 + Math.random() * 0.5);
    drag.interactive = true;
    drag.buttonMode = true;
    drag.play()
    app.stage.addChild(drag);

    drag.on('pointerdown', dragonDead);

    function dragonDead() {
      drag.visible = false;
      value--;
      res++;
      dragValue.text = value === 0 ? 'GAME OVER' : `Dragons alive ${value}`;
      score.text = value === 0 ? 'YOU KILLED EVERYONE' : `Dragons killed ${res}`;
    }
    app.ticker.add(() => {
      drag.position.x -= 1;
    });
  }

  const dragValue = new Text(`Dragons alive ${value}`);
  const score = new Text(`Dragons killed ${res}`);
  score.y = 50;
  app.stage.addChild(score, dragValue);
}
