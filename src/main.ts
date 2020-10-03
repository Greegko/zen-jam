import { Application, Loader, ParticleContainer, TilingSprite } from 'pixi.js';
// import style from './style.css'
import Person from './person'

import { Globals, RESOURCES } from './globals';
import { Player } from './player';

Globals.app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    // transparent: true 
});
// document.body.className = style["body"];
document.body.appendChild(Globals.app.view);

Loader.shared.add([
    { name: "t_person", url: "./assets/sprites/people/temp_person.png" },
    { name: "t_ground", url: "./assets/sprites/world/dirt.png" }
]).load(setup);

function setup() {

    const tilingSprite = new TilingSprite(
        RESOURCES["t_ground"].texture,
        Globals.app.screen.width,
        Globals.app.screen.height,
    );

    Globals.app.stage.addChild(tilingSprite);


    const player = new Player();
    player.init(100, 100);

    Globals.player = player;

    let person = new Person();
    Globals.crowd.push(person);
    person.init(
        Globals.app.renderer.width / 2,
        Globals.app.renderer.height / 2
    );

    const container = new ParticleContainer();
    container.addChild(player.sprite);
    container.addChild(person.sprite);

    Globals.app.stage.addChild(container);

    Globals.app.ticker.add(delta => loop(delta));
}


function loop(delta) {
    Globals.player.update();

    for (let i = 0; i < Globals.crowd.length; i++) {
        const person = Globals.crowd[i];
        person.update(delta);
    }
}
