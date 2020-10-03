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

const container = new ParticleContainer();
const backgroundContainer = new ParticleContainer();

function setup() {
    generateBackgroundTiles().forEach((tile) => backgroundContainer.addChild(tile));

    const player = new Player();
    player.init(100, 100);

    Globals.player = player;

    let person = new Person();
    Globals.crowd.push(person);
    person.init(100, 100);

    container.addChild(player.sprite);
    container.addChild(person.sprite);

    Globals.app.stage.addChild(backgroundContainer);
    Globals.app.stage.addChild(container);

    Globals.app.ticker.add(delta => loop(delta));
}


function loop(delta) {
    Globals.player.update();

    updatePlayerCamera();

    for (let i = 0; i < Globals.crowd.length; i++) {
        const person = Globals.crowd[i];
        person.update(delta);
    }

}

function updatePlayerCamera() {
    const playerSprite = Globals.player.sprite;
    const canvas = document.getElementsByTagName('canvas')[0].getBoundingClientRect();
    const x = canvas.width / 2 - playerSprite.x - playerSprite.width / 2;
    const y = canvas.height / 2 - playerSprite.y - playerSprite.height / 2

    container.position.x = backgroundContainer.position.x = x;
    container.position.y = backgroundContainer.position.y = y;
}

const createBackgroundTile = (x: number, y: number) => {
    const tile = new TilingSprite(RESOURCES["t_ground"].texture);
    tile.x = x;
    tile.y = y;

    return tile;
}

function generateBackgroundTiles() {
    const tiles = [];
    const width = RESOURCES["t_ground"].texture.width;
    const height = RESOURCES["t_ground"].texture.height;

    for (let i = -20; i < 20; i++) {
        for (let k = -20; k < 20; k++) {
            tiles.push(createBackgroundTile(width * i, height * k));
        }
    }

    return tiles;
}
