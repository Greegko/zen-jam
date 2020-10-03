import { Pixi, Globals } from './main'

class Person {
  private sprite: PIXI.Sprite;

  constructor() {
    this.sprite = new Pixi.Sprite(
      Pixi.Resources["t_person"].texture
    );

    this.sprite.x = Globals.app.renderer.width / 2;
    this.sprite.y = Globals.app.renderer.height / 2;

    Globals.app.stage.addChild(this.sprite);
  }

  update() {
    this.sprite.x += 1;
  }
}

export default Person;