import * as PIXI from 'pixi.js'
// import style from './style.css'
import Person from './person'

import { Globals } from './globals';
import { Player } from './player';


let Pixi = {
    Application: PIXI.Application,
    Loader: PIXI.Loader.shared,
    Resources: PIXI.Loader.shared.resources,
    Sprite: PIXI.Sprite,
    TilingSprite: PIXI.TilingSprite,
    Ticker: PIXI.Ticker,
}


Globals.app = new Pixi.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    // transparent: true 
});
// document.body.className = style["body"];
document.body.appendChild(Globals.app.view);

Pixi.Loader
    .add([
        { name: "t_person", url: "./assets/temp_person.png" },
        { name: "t_ground", url: "./assets/dirt.png" }
    ])
    .load(setup);

function setup() {

    const tilingSprite = new Pixi.TilingSprite(
        Pixi.Resources["t_ground"].texture,
        Globals.app.screen.width,
        Globals.app.screen.height,
    );

    Globals.app.stage.addChild(tilingSprite);


    const player = new Player();
    player.init(100, 100);

    Globals.player = player;

    let myPerson = new Person();
    myPerson.init(
        Globals.app.renderer.width / 2,
        Globals.app.renderer.height / 2
    );

    Globals.crowd.push(myPerson);

    Globals.app.ticker.add(delta => loop(delta));
}


function loop(delta) {
    Globals.player.update();

    for (let i = 0; i < Globals.crowd.length; i++) {
        const person = Globals.crowd[i];
        person.update();
    }
}


export { Pixi, Globals };