import { AnimatedSprite, Application, Container, Loader, Sprite, Texture } from 'pixi.js';
import Person from './person'

import { Globals } from './globals';
import { Player } from './player';

Globals.app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 255 ^ 3 - 255
});

document.body.appendChild(Globals.app.view);

const rootPeoplePath = './assets/sprites/people';

const createAnimatedSprite = (name: string) => {
    const textures = Array(3).fill(null)
        .map((x, i) => rootPeoplePath + "/" + name + "_0" + (i + 1) + ".png")
        .map(x => Texture.from(x));

    const animatedSprite = new AnimatedSprite(textures);
    animatedSprite.animationSpeed = 10 / 60;
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
function setup() {
    const player = new Player();
    player.init(getRandomCharacterSprite(), 0, 0);

    Globals.player = player;

    for (let i = 0; i < 200; i++) {
        let person = new Person();
        person.init(getRandomCharacterSprite(), Math.random() * (i - 25) * 10, Math.random() * (i - 25) * 10);
        Globals.crowd.push(person);
        container.addChild(person.sprite);
    }

    container.addChild(player.sprite);
    Globals.app.stage.addChild(container);
    Globals.app.ticker.add(delta => loop(delta));
}

function loop(delta) {
    Globals.player.update();

    updatePlayerCamera();

    for (let i = 0; i < Globals.crowd.length; i++) {
        const person = Globals.crowd[i];

        person.update(delta, i);
    }

    updatePersonsIndex();
}

function updatePersonsIndex() {
    const sprites: Sprite[] = [Globals.player.sprite, ...Globals.crowd.map(x => x.sprite)];
    sprites
        .sort((x, y) => x.y !== y.y ? (x.y < y.y ? -1 : 1) : 0)
        .forEach((sprite, index) => container.setChildIndex(sprite, index));
}

function updatePlayerCamera() {
    const playerSprite = Globals.player.sprite;
    const canvas = document.getElementsByTagName('canvas')[0].getBoundingClientRect();
    const x = canvas.width / 2 - playerSprite.x - playerSprite.width / 2;
    const y = canvas.height / 2 - playerSprite.y - playerSprite.height / 2

    container.position.x = x;
    container.position.y = y;
}
