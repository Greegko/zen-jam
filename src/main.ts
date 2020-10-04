import { Application, Container, Loader, Sprite, Graphics } from 'pixi.js';
import Person from './person'

import { Globals } from './globals';
import { Player } from './player';
import { CHARACTER_ASSETS_IDS, getCharacterId, getRandomCharacterSprite } from './assets';

Globals.app = new Application({
    width: window.innerWidth,
    height: window.innerHeight
});

document.body.appendChild(Globals.app.view);

const allAssetsUrls = Object.entries(CHARACTER_ASSETS_IDS).reduce(
    (acc, [characterKey, ids]) => [...acc, ...ids.map(id => getCharacterId(characterKey, id))],
    []
);

Loader.shared.add(allAssetsUrls).load(setup);

const container = new Container();
function setup() {

    const mist = new Graphics();
    mist.beginFill(0x4a4a4a);
    mist.drawRect(0, 0, Globals.app.view.width, Globals.app.view.height);
    mist.endFill();
    Globals.app.stage.addChild(mist);

    const player = new Player();
    player.init(0, 0);

    Globals.player = player;


    for (let i = 0; i < 100; i++) {
        let person = new Person("lazy");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        container.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) container.addChild(person.overlaySprite);
    }
    for (let i = 0; i < 70; i++) {
        let person = new Person("calm");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        container.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) container.addChild(person.overlaySprite);
    }
    for (let i = 0; i < 5; i++) {
        let person = new Person("friend");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        container.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) container.addChild(person.overlaySprite);
    }
    for (let i = 0; i < 3; i++) {
        let person = new Person("stalker");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        container.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) container.addChild(person.overlaySprite);
    }
    for (let i = 0; i < 3; i++) {
        let person = new Person("rager");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        container.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) container.addChild(person.overlaySprite);
    }
    for (let i = 0; i < 40; i++) {
        let person = new Person("shy");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        container.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) container.addChild(person.overlaySprite);
    }
    for (let i = 0; i < 20; i++) {
        let person = new Person("snapper");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        container.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) container.addChild(person.overlaySprite);
    }

    container.addChild(player.sprite);
    Globals.app.stage.addChild(container);



    let vignette = Sprite.from('./assets/sprites/FXs/vignette_and_dust.png');
    vignette.x = 0;
    vignette.y = 0;
    vignette.zIndex = -10000;
    vignette.width = Globals.app.screen.width;
    vignette.height = Globals.app.screen.height;
    Globals.app.stage.addChild(vignette);

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
