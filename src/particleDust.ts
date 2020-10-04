import { Sprite, ParticleContainer} from "pixi.js";
import {Globals } from "./globals";


export class ParticleDust {
  private container: ParticleContainer;

  init(x: number, y: number) {

    this.container = new ParticleContainer();
    this.container.x = 0;
    this.container.y = 0;
    this.container.width = Globals.app.view.width;
    this.container.height = Globals.app.view.height;


    for (let i = 0; i < 100; ++i)
    {
        let sprite = Sprite.from("./assets/sprites/Fxs/dust.png");
        this.container.addChild(sprite);
    }

  }

  update() {
    for (let i = 0; i < this.container.children.length; i++) {
      const particle = this.container.children[i];
      console.log(particle);
      
      
    }
    // this.sprite.x += this.xDirection;
    // this.sprite.y += this.yDirection;
  }
}
