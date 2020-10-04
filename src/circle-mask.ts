import { Container, filters, Graphics, Rectangle, SCALE_MODES, Sprite, Ticker } from "pixi.js";
import { Globals } from "./globals";

export class CircleMask {
  private scale: number = 1;
  private focusSprite: Sprite;
  private stage: Container;
  private ticker: Ticker;

  private callback: Function;

  constructor(stage: Container, ticker: Ticker) {
    this.stage = stage;
    this.ticker = ticker;

    this.focusSprite = this.createTextureMask();
  }

  start(callback: Function) {
    this.callback = callback;
    this.focusSprite.x = Globals.app.view.width / 2 - this.focusSprite.width / 2;
    this.focusSprite.y = Globals.app.view.height / 2 - this.focusSprite.height / 2;

    this.stage.addChild(this.focusSprite);
    this.stage.mask = this.focusSprite;

    this.ticker.add(this.update);
  }

  remove() {
    this.stage.removeChild(this.focusSprite);
    this.stage.mask = undefined;
  }

  private createTextureMask() {
    const radius = 1500;
    const blurSize = 32;

    const circle = new Graphics()
      .beginFill(0xFF0000)
      .drawCircle(radius + blurSize, radius + blurSize, radius)
      .endFill();
    circle.filters = [new filters.BlurFilter(blurSize)];

    const bounds = new Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
    const texture = Globals.app.renderer.generateTexture(circle, SCALE_MODES.NEAREST, 1, bounds);
    return new Sprite(texture);
  }

  private update = () => {
    this.scale *= 0.95;
    this.focusSprite.scale.set(this.scale);
    this.focusSprite.x = Globals.app.view.width / 2 - this.focusSprite.width / 2;
    this.focusSprite.y = Globals.app.view.height / 2 - this.focusSprite.height / 2;

    if (this.scale < 0.001) {
      this.callback();
      this.ticker.remove(this.update);
    }
  }
}