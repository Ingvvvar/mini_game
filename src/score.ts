import { Application, Text } from 'pixi.js';

export class Score {
  dragonsAliveText: Text;
  dragonsKilledText: Text;
  app: Application;

  constructor(app: Application) {
    this.app = app;
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
    restartButton.x = (this.app.screen.width - restartButton.width) / 2;
    restartButton.y = this.app.screen.height / 2;

    restartButton.on('pointerdown', () => {
      window.location.reload();
    });

    this.app.stage.addChild(restartButton);
  }
}
