import { Application } from 'pixi.js';
import { Game } from './game';

const app = new Application({
  view: document.getElementById("canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  antialias: true,
  backgroundColor: 0x6495ed,
  width: window.innerWidth,
  height: window.innerHeight
});

app.loader
  .add("dragon", "drags.json")
  .add('clouds', "clouds.png")
  .add("dragons_data", "dragons_data.json")
  .load((_, resources) => {
    const dragonPositions = resources.dragons_data.data.dragons;
    const numberOfDragons = resources.dragons_data.data.numberOfDragons;
    new Game(app, dragonPositions, numberOfDragons);
  });
