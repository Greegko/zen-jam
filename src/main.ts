// document.getElementById('game').innerHTML = 'Hello Zen Jam!';

import * as PIXI from 'pixi.js'

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    // transparent: true 
});
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('./assets/temp_person.png');

 
// Setup the position of the bunny
bunny.x = app.renderer.width / 2;
bunny.y = app.renderer.height / 2;

app.stage.addChild(bunny);




