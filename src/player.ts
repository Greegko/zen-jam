import { Globals, SPEED } from "./globals";
import { Pixi } from "./main";

export class Player {

  private sprite: PIXI.Sprite;

  private xDirection: number = 0;
  private yDirection: number = 0;

  init(x: number, y: number) {
    this.sprite = new Pixi.Sprite(
      Pixi.Resources["t_person"].texture
    );

    this.sprite.x = x;
    this.sprite.y = y;

    Globals.app.stage.addChild(this.sprite);

    document.addEventListener('keydown', this.setInput.bind(this));
    document.addEventListener('keyup', this.releaseInput.bind(this));
  }

  update() {
    if (!this.sprite) return;

    this.sprite.x += this.xDirection;
    this.sprite.y += this.yDirection;
  }

  private releaseInput(event: KeyboardEvent) {
    const key = event.key;

    switch (key) {
      case 'a':
      case 'ArrowLeft':
        this.xDirection = 0;
        break;
      case 'w':
      case 'ArrowUp':
        this.yDirection = 0;
        break;
      case 'd':
      case 'ArrowRight':
        this.xDirection = 0;
        break;
      case 's':
      case 'ArrowDown':
        this.yDirection = 0;
        break;
    }
  }

  private setInput(event: KeyboardEvent) {
    const key = event.key;

    switch (key) {
      case 'a':
      case 'ArrowLeft':
        this.xDirection = -SPEED;
        break;
      case 'w':
      case 'ArrowUp':
        this.yDirection = -SPEED;
        break;
      case 'd':
      case 'ArrowRight':
        this.xDirection = SPEED;
        break;
      case 's':
      case 'ArrowDown':
        this.yDirection = SPEED;
        break;
    }
  }

}
