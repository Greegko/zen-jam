// import { Pixi, Globals } from './main'

export interface PersonalityEvent {
  checkFunction: string; // Callback condition function name
  checkFunctionOptions: object;
  callbackFunction: string, // Callback function name
  callbackFunctionOptions: object; // Callback function params
  applyOnlyOnPlayer: Boolean;
}

export interface Personality {
  behaviours: Record<string, Behaviour>;
  events: Record<string, PersonalityEvent>;
}

export interface Behaviour {
  default?: boolean;
  actions: Record<string, Action>;
  possibleEvents: string[];

}

export interface Action {
  default?: boolean;
  type: string; // Callback functio name
  options: object;
  nextActions: string[] // Random options for Callback functions 
}

export const PERSONALITIES: Record<string, Personality> = {
  // lazy: {
  //   behaviours: {
  //     idle: {
  //       default: true,
  //       actions: {
  //         smallWait: {
  //           default: true,
  //           type: "wait",
  //           options: { duration: 60 * 2 },
  //           nextActions: ["shortWalk", "smallWait"]
  //         },
  //         // longWait: {
  //         //   type: "wait",
  //         //   options: { duration: 60 * 10 },
  //         //   nextActions: ["shortWalk", "emote"]
  //         // },
  //         shortWalk: {
  //           type: "moveTo",
  //           options: { random: true, radius: 100 },
  //           nextActions: ["smallWait", "shortWalk"]
  //         },
  //         // emote: {
  //         //   type: "playIdleAnimation",
  //         //   options: { animation: "hello", repetition: 1 },
  //         //   nextActions: [["smallWait", 3], ["longWait", 1], ["shortWalk", 2]]
  //         // },
  //       }
  //     },
  //     moveAway: {
  //       actions: {
  //         moveAway: {
  //           type: "moveWithTarget",
  //           options: { direction: -1, run: false, distanceExit: 2 },
  //           nextActions: []
  //         }
  //       }
  //     },
  //   },
  //   events: [
  //     // {
  //     //   condition: "approach",
  //     //   contitionOptions: { validTriggers: ["player"], distance: 2, setTriggerAsTarget: true },
  //     //   result: "changeBehaviour",
  //     //   resultOptions: { behaviour: "moveAway" }
  //     // }
  //   ]
  // },
  lazy: {
    behaviours: {
      idle: {
        default: true,
        possibleEvents: ["moveAwayWhenPlayerIsClose"],
        actions: {
          longWait: {
            default: true,
            type: "wait",
            options: { duration: [60 * 5, 60 * 10] },
            nextActions: ["longWait", "shortWalk"]
          },
          shortWalk: {
            type: "moveTo",
            options: { running: false, randomDirection: true, distance: [50] },
            nextActions: ["longWait"]
          }
        }
      },
      moveAwayFromPlayer: {
        possibleEvents: [],
        actions: {
          moveTowardsTarget: {
            default: true,
            type: "stepAwayFromTarget",
            options: {running: false, distance: 100},
            nextActions: []
          }
        }
      },
    },
    events: {
      moveAwayWhenPlayerIsClose :
        {
          checkFunction: "hasApproached",
          checkFunctionOptions: {distance: 100, setTriggerAsTarget: true },
          callbackFunction: "changeBehaviour",
          callbackFunctionOptions: { behaviour: "moveAwayFromPlayer" },
          applyOnlyOnPlayer: true
        }
      },
    },
  shy: {
    behaviours: {
      idle: {
        default: true,
        possibleEvents: ["moveAwayWhenPlayerIsClose"],
        actions: {
          longWait: {
            default: true,
            type: "wait",
            options: { duration: [60 * 5, 60 * 10] },
            nextActions: ["longWait", "shortWalk"]
          },
          shortWalk: {
            type: "moveTo",
            options: { running: false, randomDirection: true, distance: [50] },
            nextActions: ["longWait"]
          }
        }
      },
      moveAwayFromPlayer: {
        possibleEvents: [],
        actions: {
          moveTowardsTarget: {
            default: true,
            type: "stepAwayFromTarget",
            options: {running: false, distance: 400},
            nextActions: []
          }
        }
      },
    },
    events: {
      moveAwayWhenPlayerIsClose :
        {
          checkFunction: "hasApproached",
          checkFunctionOptions: {distance: 400, setTriggerAsTarget: true },
          callbackFunction: "changeBehaviour",
          callbackFunctionOptions: { behaviour: "moveAwayFromPlayer" },
          applyOnlyOnPlayer: true
        }
      },
    },
  calm: {
      behaviours: {
        idle: {
          default: true,
          possibleEvents: ["moveAwayWhenPlayerIsClose"],
          actions: {
            shortWait: {
              default: true,
              type: "wait",
              options: { duration: [60 * 2, 60 * 4] },
              nextActions: ["longWalk", "shortWalk", "shortWalk"]
            },
            shortWalk: {
              type: "moveTo",
              options: { running: false, randomDirection: true, distance: [100, 150] },
              nextActions: ["shortWait", "shortWalk"]
            },
            longWalk: {
              type: "moveTo",
              options: { running: false, randomDirection: true, distance: [250, 500] },
              nextActions: ["shortWait"]
            }

          }
        },
        moveAwayFromPlayer: {
          possibleEvents: [],
          actions: {
            moveTowardsTarget: {
              default: true,
              type: "stepAwayFromTarget",
              options: {running: false, distance: 40},
              nextActions: []
            }
          }
        },
      },
      events: {
        moveAwayWhenPlayerIsClose :
          {
            checkFunction: "hasApproached",
            checkFunctionOptions: {distance: 30, setTriggerAsTarget: true },
            callbackFunction: "changeBehaviour",
            callbackFunctionOptions: { behaviour: "moveAwayFromPlayer" },
            applyOnlyOnPlayer: true
          }
        },
    },
  stalker: {
      behaviours: {
        idle: {
          default: true,
          possibleEvents: ["startChaseWhenPlayerIsClose"],
          actions: {
            shortWait: {
              default: true,
              type: "wait",
              options: { duration: [60 * 2, 60 * 4] },
              nextActions: ["longWalk", "shortWalk", "shortWalk"]
            },
            shortWalk: {
              type: "moveTo",
              options: { running: false, randomDirection: true, distance: [100, 150] },
              nextActions: ["shortWait", "shortWalk"]
            },
            longWalk: {
              type: "moveTo",
              options: { rrunning: false, andomDirection: true, distance: [250, 500] },
              nextActions: ["shortWait"]
            }
          }
        },
        chasePlayer: {
          possibleEvents: [],
          actions: {
            chaseTarget: {
              default: true,
              type: "chasePlayer",
              options: {running: false, duration: [6 * 60]},
              nextActions: ["rest"]
            },
            rest: {
              default: true,
              type: "wait",
              options: { duration: [60 * 10] },
              nextActions: []
            },
          }
        },
      },
      events: {
        startChaseWhenPlayerIsClose :
          {
            checkFunction: "hasApproached",
            checkFunctionOptions: {distance: 400, setTriggerAsTarget: true },
            callbackFunction: "changeBehaviour",
            callbackFunctionOptions: { behaviour: "chasePlayer" },
            applyOnlyOnPlayer: true
          }
        },   
    },
  rager: {
    behaviours: {
      run: {
        default: true,
        possibleEvents: [],
        actions: {
          runShort: {
            default: true,
            type: "moveTo",
            options: { running: true, randomDirection: true, distance: [300, 400] },
            nextActions: ["runShort", "runShort", "runLong", "walkShort"]
          },
          runLong: {
            type: "moveTo",
            options: { running: true, randomDirection: true, distance: [600, 1000] },
            nextActions: ["runShort", "walkShort"]
          },
          walkShort: {
            type: "moveTo",
            options: { running: false, randomDirection: true, distance: [100, 300] },
            nextActions: ["runShort", "runLong"]
          },
        }
      },
      
    },
    events: {},   
  },
  snapper: {
    behaviours: {
      standStill: {
        default: true,
        possibleEvents: ["snapAtPlayer"],
        actions: {
          justWait: {
            default: true,
            type: "wait",
            options: { duration: [60 * 10] },
            nextActions: ["justWait",]
          }
          //evil emote?
        }
      },
      chasePlayer: {
        possibleEvents: [],
        actions: {
          chaseTarget: {
            default: true,
            type: "chasePlayer",
            options: {running: true, duration: [3 * 60]},
            nextActions: ["rest"]
          },
          rest: {
            default: true,
            type: "wait",
            options: { duration: [60 * 5] },
            nextActions: []
          },
        }
      },
    },
    events: {
      snapAtPlayer :
        {
          checkFunction: "hasApproached",
          checkFunctionOptions: {distance: 200, setTriggerAsTarget: true },
          callbackFunction: "changeBehaviour",
          callbackFunctionOptions: { behaviour: "chasePlayer" },
          applyOnlyOnPlayer: true
        }
      },
    },
  friend: {
    behaviours: {
      idle: {
        default: true,
        possibleEvents: ["followPlayerWhenClose"],
        actions: {
          smallWait: {
            default: true,
            type: "wait",
            options: { duration: 60 * 2 },
            nextActions: ["shortWalk", "smallWait"]
          },
          shortWalk: {
            type: "moveTo",
            options: { random: true, radius: 100 },
            nextActions: ["smallWait", "shortWalk"]
          }
        }
      },
      followPlayer: {
        possibleEvents: [],
        actions: {
          followPlayer: {
            default: true,
            type: "followPlayer",
            options: {},
            nextActions: []
          }
        }
      },
    },
    events: {
      followPlayerWhenClose :
        {
          checkFunction: "hasApproached",
          checkFunctionOptions: { distance: 40, setTriggerAsTarget: true },
          callbackFunction: "changeBehaviour",
          callbackFunctionOptions: { behaviour: "followPlayer" },
          applyOnlyOnPlayer: true
        }
      },
    }
};
