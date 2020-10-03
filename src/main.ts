import { Application, Container, Loader, Sprite, Graphics } from 'pixi.js';
import Person from './person'

import { Globals } from './globals';
import { Player } from './player';
import { CHARACTER_ASSETS_IDS, getCharacterId, getRandomCharacterSprite } from './assets';

Globals.app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 255 ^ 3 - 255,
    
});

document.body.appendChild(Globals.app.view);

const allAssetsUrls = Object.entries(CHARACTER_ASSETS_IDS).reduce(
    (acc, [characterKey, ids]) => [...acc, ...ids.map(id => getCharacterId(characterKey, id))],
    []
);

Loader.shared.add(allAssetsUrls).load(setup);

const container = new Container();
function setup() {

    const graphics = new Graphics();
    graphics.beginFill(0x4a4a4a);
    graphics.drawRect(-1000, -100, 5000, 5000);
    graphics.endFill();
    Globals.app.stage.addChild(graphics);

    const player = new Player();
    player.init(0, 0);

    Globals.player = player;

    for (let i = 0; i < 4; i++) {
        let person = new Person("rager");
        person.init(getRandomCharacterSprite(), Math.random() * (i - 25) * 120, Math.random() * (i - 25) * 120);
        Globals.crowd.push(person);
        container.addChild(person.sprite);
    }
    for (let i = 0; i < 500; i++) {
        let person = new Person("lazy");
        person.init(getRandomCharacterSprite(), Math.random() * (i - 25) * 10, Math.random() * (i - 25) * 10);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        container.addChild(person.sprite);
    }
    // for (let i = 0; i < 10; i++) {
    //     let person = new Person("lazy");
    //     person.init(getRandomCharacterSprite(), Math.random() * (i - 25) * 100, Math.random() * (i - 25) * 100);
    //     Globals.crowd.push(person);
    //     // console.log(person.sprite);
    //     container.addChild(person.sprite);
    // }

    container.addChild(player.sprite);


    


    Globals.app.stage.addChild(container);



    let vignette = Sprite.from('./assets/sprites/FXs/vignette.png');
    vignette.x = 0;
    vignette.y = 0;
    vignette.zIndex = -10000;
    vignette.width =  Globals.app.screen.width;
    vignette.height =  Globals.app.screen.height;
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
