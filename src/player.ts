import { Sprite } from "pixi.js";
import { getPlayerSprite } from "./assets";
import { WALKING_SPEED } from "./globals";


export class Player {
  public sprite: Sprite;

  private spriteTextures = getPlayerSprite();

  private xDirection: number = 0;
  private yDirection: number = 0;

  init(x: number, y: number) {
    this.sprite = new Sprite(this.spriteTextures.F.texture);

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
        this.sprite.texture = this.spriteTextures.L.texture;
        this.xDirection = -WALKING_SPEED;
        break;
      case 'w':
      case 'ArrowUp':
        this.sprite.texture = this.spriteTextures.B.texture;
        this.yDirection = -WALKING_SPEED;
        break;
      case 'd':
      case 'ArrowRight':
        this.sprite.texture = this.spriteTextures.R.texture;
        this.xDirection = WALKING_SPEED;
        break;
      case 's':
      case 'ArrowDown':
        this.sprite.texture = this.spriteTextures.F.texture;
        this.yDirection = WALKING_SPEED;
        break;
    }
  }

}
