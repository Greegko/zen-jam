import { AnimatedSprite, Application, Container, Loader, ParticleContainer, Sprite, Texture, TilingSprite } from 'pixi.js';
import Person from './person'

import { Globals, RESOURCES } from './globals';
import { Player } from './player';
import { hitTestRectangle } from './utils';

Globals.app = new Application({
    width: window.innerWidth,
    height: window.innerHeight
});

document.body.appendChild(Globals.app.view);

const rootPeoplePath = './assets/sprites/people';

const createAnimatedSprite = (name: string) => {
    const textures = Array(3).fill(null)
        .map((x, i) => rootPeoplePath + "/" + name + "_0" + (i + 1) + ".png")
        .map(x => Texture.from(x));

    const animatedSprite = new AnimatedSprite(textures);
    animatedSprite.animationSpeed = 3 / 60;
    animatedSprite.play();

    return animatedSprite;
}

const getRandomCharacterSprite = () => {
    const id = ['EmptyMan', 'ManlyMan', 'ShoppingJanine'][Math.floor(Math.random() * 3)];
    return createAnimatedSprite(id);
}

const ASSETS = {
    'EmptyMan': ['EmptyMan_01.png', 'EmptyMan_02.png', 'EmptyMan_03.png'],
    'ManlyMan': ['ManlyMan_01.png', 'ManlyMan_02.png', 'ManlyMan_03.png'],
    'ShoppingJanine': ['ShoppingJanine_01.png', 'ShoppingJanine_02.png', 'ShoppingJanine_03.png']
}

const allAssetsUrls = Object.values(ASSETS).reduce((acc, curr) => [...acc, ...curr], []);

Loader.shared.add([
    ...allAssetsUrls,
    { name: "t_ground", url: "./assets/sprites/world/dirt.png" }
]).load(setup);

const container = new Container();
const backgroundContainer = new ParticleContainer();
function setup() {
    generateBackgroundTiles().forEach((tile) => backgroundContainer.addChild(tile));

    const player = new Player();
    player.init(getRandomCharacterSprite(), 0, 0);

    Globals.player = player;

    for (let i = 0; i < 50; i++) {
        let person = new Person();
        person.init(getRandomCharacterSprite(), Math.random() * (i - 25) * 150, Math.random() * (i - 25) * 150);
        Globals.crowd.push(person);
        console.log(person.sprite);
        container.addChild(person.sprite);
    }

    container.addChild(player.sprite);

    Globals.app.stage.addChild(backgroundContainer);
    Globals.app.stage.addChild(container);

    Globals.app.ticker.add(delta => loop(delta));
}


function loop(delta) {
    Globals.player.update();

    updatePlayerCamera();
    updatePersonsIndex();

    for (let i = 0; i < Globals.crowd.length; i++) {
        const person = Globals.crowd[i];
        if (hitTestRectangle(person.sprite, Globals.player.sprite)) {
            person.collade();
        }

        person.update(delta);
    }

}

function updatePersonsIndex() {
    const sprites: Sprite[] = [Globals.player.sprite, ...Globals.crowd.map(x => x.sprite)];
    sprites.sort((x, y) => x.y < y.y ? -1 : 1);
    sprites.forEach((sprite, index) => container.setChildIndex(sprite, index));
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
