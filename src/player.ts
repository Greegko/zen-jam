import { Sprite } from "pixi.js";
import { WALKING_SPEED } from "./globals";

export class Player {
  public sprite: Sprite;

  private xDirection: number = 0;
  private yDirection: number = 0;

  init(sprite: Sprite, x: number, y: number) {
    this.sprite = sprite;

    this.sprite.x = x;
    this.sprite.y = y;

    document.addEventListener('keydown', this.setInput.bind(this));
    document.addEventListener('keyup', this.releaseInput.bind(this));
  }

  update() {
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
        this.xDirection = -WALKING_SPEED;
        break;
      case 'w':
      case 'ArrowUp':
        this.yDirection = -WALKING_SPEED;
        break;
      case 'd':
      case 'ArrowRight':
        this.xDirection = WALKING_SPEED;
        break;
      case 's':
      case 'ArrowDown':
        this.yDirection = WALKING_SPEED;
        break;
    }
  }

}
