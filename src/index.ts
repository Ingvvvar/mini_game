import { Application } from 'pixi.js'

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