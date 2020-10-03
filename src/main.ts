import * as PIXI from 'pixi.js'
// import style from './style.css'
import Person from './person'


let Pixi = {
    Application: PIXI.Application,
    Loader: PIXI.Loader.shared,
    Resources: PIXI.Loader.shared.resources,
    Sprite: PIXI.Sprite,
    TilingSprite: PIXI.TilingSprite,
    Ticker: PIXI.Ticker,
}
let Globals = {
    app: null,
    crowd: []
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



    let myPerson = new Person();
    Globals.crowd.push(myPerson);



    Globals.app.ticker.add(delta => loop(delta));
}

function loop(delta) {
    for (let i = 0; i < Globals.crowd.length; i++) {
        const person = Globals.crowd[i];
        person.update();

    }
}


export { Pixi, Globals };