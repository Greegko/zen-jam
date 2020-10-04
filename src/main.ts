import { Application, Container, Loader, Sprite, Graphics } from 'pixi.js';
import Person from './person'
import {SpawnManager} from './spawnManager'
import { Globals } from './globals';
import { Player } from './player';
import { SoundEngine } from './soundEngine';
import { CHARACTER_ASSETS_IDS, getCharacterId, getRandomCharacterSprite } from './assets';
import { CircleMask } from './circle-mask';

Globals.app = new Application({
    width: window.innerWidth,
    height: window.innerHeight
});

let isLimboActive = true;
Globals.triggerLimbo = () => {
    if (isLimboActive) {
        enterLimbo();
    } else {
        exitLimbo();
    }

    isLimboActive = !isLimboActive;
}

document.body.appendChild(Globals.app.view);

const allAssetsUrls = Object.entries(CHARACTER_ASSETS_IDS).reduce(
    (acc, [characterKey, ids]) => [...acc, ...ids.map(id => getCharacterId(characterKey, id))],
    []
);

Loader.shared.add(allAssetsUrls).load(setup);

const mainGameScreen = new Container();
const crowdContainer = new Container();
const circleMask = new CircleMask(mainGameScreen, Globals.app.ticker);

let isRunning = false;
setTimeout(() => {
    document.getElementsByTagName('canvas')[0].style.visibility = 'visible';
    isRunning = true;
}, 3000);

function setup() {
    Globals.sound = new SoundEngine();
    Globals.sound.init();
    
    const mist = new Graphics();
    mist.beginFill(0x4a4a4a);
    mist.drawRect(0, 0, Globals.app.view.width, Globals.app.view.height);
    mist.endFill();
    mainGameScreen.addChild(mist);

    const player = new Player();
    player.init(0, 0); 
    
    Globals.player = player;
    
    const spawnManager = new SpawnManager(); //after player
    Globals.spawnManager = spawnManager;

    generatePersons();

    crowdContainer.addChild(player.sprite);
    mainGameScreen.addChild(crowdContainer);

    let vignette = Sprite.from('./assets/sprites/FXs/vignette_and_dust.png');
    vignette.x = 0;
    vignette.y = 0;
    vignette.zIndex = -10000;
    vignette.width = Globals.app.screen.width;
    vignette.height = Globals.app.screen.height;
    mainGameScreen.addChild(vignette);

    Globals.app.ticker.add(crowdContainerLoop);
    Globals.app.stage.addChild(mainGameScreen);
}

function generatePersons() {
    for (let i = 0; i < 100; i++) {
        let person = new Person("lazy");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        crowdContainer.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) crowdContainer.addChild(person.overlaySprite);
    }
    for (let i = 0; i < 70; i++) {
        let person = new Person("calm");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        crowdContainer.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) crowdContainer.addChild(person.overlaySprite);
    }
    for (let i = 0; i < 5; i++) {
        let person = new Person("friend");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        crowdContainer.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) crowdContainer.addChild(person.overlaySprite);
    }
    for (let i = 0; i < 6; i++) {
        let person = new Person("stalker");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        crowdContainer.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) crowdContainer.addChild(person.overlaySprite);
    }
    for (let i = 0; i < 3; i++) {
        let person = new Person("rager");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        crowdContainer.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) crowdContainer.addChild(person.overlaySprite);
    }
    for (let i = 0; i < 40; i++) {
        let person = new Person("shy");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        crowdContainer.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) crowdContainer.addChild(person.overlaySprite);
    }
    for (let i = 0; i < 20; i++) {
        let person = new Person("snapper");
        person.init(getRandomCharacterSprite(), (Math.random() * 2 - 1) * 1000 + 1000, (Math.random() * 2 - 1) * 1000);
        Globals.crowd.push(person);
        // console.log(person.sprite);
        crowdContainer.addChild(person.sprite);
        if (person.overlaySprite instanceof Sprite) crowdContainer.addChild(person.overlaySprite);
    }
}

let limboResolver: Function = null;

function enterLimbo() {
    Globals.app.ticker.remove(crowdContainerLoop);
    circleMask.start(() => {
        limboResolver = startLimbo();
    });
}

function exitLimbo() {
    crowdContainer.removeChildren(0);
    Globals.crowd = [];

    limboResolver();
    generatePersons();
    circleMask.revert(() => {
        Globals.app.ticker.add(crowdContainerLoop);
    });
}

function startLimbo() {
    const limboScreen = new Container();
    const goodFellow = new Person('limboFriend');

    const maxWidth = Globals.app.screen.width;
    const maxHeight = Globals.app.screen.height;

    goodFellow.init(
        getRandomCharacterSprite(),
        Globals.player.sprite.x + Math.floor(Math.random() * maxWidth) - maxWidth / 2,
        Globals.player.sprite.y + Math.floor(Math.random() * maxHeight) - maxHeight / 2
    );

    limboScreen.addChild(Globals.player.sprite);
    limboScreen.addChild(goodFellow.sprite);

    Globals.app.stage.addChild(limboScreen);

    function limboLoop() {
        Globals.player.update();

        updatePlayerCamera(limboScreen, Globals.player.sprite);
        goodFellow.update(0, 0);
        // updatePersonsIndex(limboScreen, [Globals.player.sprite, goodFellow.sprite]);
    }

    Globals.app.ticker.add(limboLoop);

    return () => {
        Globals.app.ticker.remove(limboLoop);
        Globals.app.stage.removeChild(limboScreen);

        Globals.crowd.push(goodFellow);
        crowdContainer.addChild(goodFellow.sprite);
        crowdContainer.addChild(Globals.player.sprite);
    }
}

function crowdContainerLoop(delta) {
    if (!isRunning) return;

    Globals.player.update();

    updatePlayerCamera(crowdContainer, Globals.player.sprite);

    for (let i = 0; i < Globals.crowd.length; i++) {
        const person = Globals.crowd[i];
        if(person.toBeRecycled){
            person.sprite.destroy();
            Globals.crowd.splice(i, 1);
            i--;
            continue
        }
        person.update(delta, i);
        //Globals.spawnManager.managePerson(person);
    }

    updatePersonsIndex(crowdContainer, [Globals.player.sprite, ...Globals.crowd.map(x => x.sprite)]);
}

function updatePersonsIndex(container: Container, sprites: Sprite[]) {
    sprites
        .sort((x, y) => x.y !== y.y ? (x.y < y.y ? -1 : 1) : 0)
        .forEach((sprite, index) => crowdContainer.setChildIndex(sprite, index));
}

function updatePlayerCamera(container: Container, centerSprite: Sprite) {
    const canvas = document.getElementsByTagName('canvas')[0].getBoundingClientRect();
    const x = canvas.width / 2 - centerSprite.x - centerSprite.width / 2;
    const y = canvas.height / 2 - centerSprite.y - centerSprite.height / 2

    crowdContainer.position.x = x;
    crowdContainer.position.y = y;
}
