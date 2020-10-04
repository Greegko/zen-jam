import Tools from './tools'
import {Howl} from 'howler';



export class SoundEngine {

  
private sounds: any;

  init() {
    this.sounds = {
      snapper_start: [
        new Howl({src:["./assets/sounds/Snaper1.mp3"]}),
        new Howl({src:["./assets/sounds/Snaper2.mp3"]}),
        new Howl({src:["./assets/sounds/Snaper3.mp3"]}),
        new Howl({src:["./assets/sounds/Snaper4.mp3"]}),
        new Howl({src:["./assets/sounds/Snaper5.mp3"]}),
      ],
      snapperPresence: new Howl({src:["./assets/sounds/around_snapper.mp3"], volume: 1}),
      stalkerChase: new Howl({src:["./assets/sounds/stalker_chase.mp3"], volume: 1})
    }
    // this.playSnapperStart();
  }

  playSnapperStart() {
    let s = Tools.randomFromList(this.sounds.snapper_start);
    
    s.play();
    if(this.sounds.snapperPresence.playing()) this.sounds.snapperPresence.stop();
  }
  activateSnapperPresence(){
    console.log("presence");
    
    if(!this.sounds.snapperPresence.playing()) this.sounds.snapperPresence.play();
  }
  activateStalkerChase(){   
    if (this.sounds.stalkerChase.playing()) {
      this.sounds.stalkerChase.stop()
      this.sounds.stalkerChase.play()
    }
    else this.sounds.stalkerChase.play();
    console.log(this.sounds.stalkerChase.playing());
  }


}