// import { Pixi, Globals } from './main'

class Personality {

  private lazy:  Object

  constructor() {


    this.lazy = {
      behaviours: {
        idle: {
          default: true,
          actions: {
            smallWait: {
              do: "wait",
              options: {duration: 60 * 2},
              exitTargets: ["shortWalk", "emote"]
            },
            longWait: {
              do: "wait",
              options: {duration: 60 * 10},
              exitTargets: ["shortWalk", "emote"]
            },
            shortWalk: {
              do: "walkTo",
              options: {random: true, radius: 5},
              exitTargets: [["smallWait", 3], ["longWait", 1]]
            },
            emote: {
              do: "playIdleAnimation",
              options: {animation: "hello", repetition: 1},
              exitTargets: [["smallWait", 3], ["longWait", 1], ["shortWalk", 2]]
            },
          }
        },
        moveAway: {
          actions: {
            moveAway: {
              do: "moveWithTarget",
              options: {direction: -1, run: false, distanceExit: 2},
              exitTargets: []
            }
          }
        },
      },
      events: {
        playerIsClose : {
          condition: "approach",
          contitionOptions: {validTriggers: ["player"], distance: 2, setTriggerAsTarget: true},
          result: "changeBehaviour",
          resultOptions: {behaviour : "moveAway"}
        }
      },
    }
    
  }

  update() {
    if(!this.lazy) console.log("ho");
    
  }

  
}

export default Personality;