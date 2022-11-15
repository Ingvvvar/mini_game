import { Application, Texture, TilingSprite } from 'pixi.js'

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