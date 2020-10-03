import {Pixi, Globals} from './main'


let Person = function (args) {
  
    this.name = args.name? args.name : "john_john"
    this.sprite = new Pixi.Sprite(
      Pixi.Resources["t_person"].texture
  );

  this.sprite.x = Globals.app.renderer.width / 2;
  this.sprite.y = Globals.app.renderer.height / 2;

  Globals.app.stage.addChild(this.sprite);

}
Person.prototype = {
  update: function () {
    this.sprite.x += 1;
  }
}


export default Person;