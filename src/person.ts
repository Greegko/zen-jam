import { SPEED } from './globals';
import { Pixi, Globals } from './main'

class Person {
  private sprite: PIXI.Sprite;

  init(x: number, y: number) {
    this.sprite = new Pixi.Sprite(
      Pixi.Resources["t_person"].texture
    );

    this.sprite.x = x;
    this.sprite.y = y;

    Globals.app.stage.addChild(this.sprite);
  }

  update() {
    this.sprite.x += SPEED;
  }
}

export default Person;