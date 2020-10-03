
let Tools = {

  isPointAtTarget: function(p1x, p1y, p2x, p2y, sensibility){
    let dist = Tools.distanceBetweenTwoPoints([p1x, p1y], [p2x, p2y]);
    if(dist <= sensibility) return true;
    else return false;
  },
  distanceBetweenTwoPoints: function(p1: number[], p2: number[]){
    
    let vecAB = [p2[0] - p1[0], p2[1] - p1[1]];
    let distance = Math.sqrt(Math.pow(vecAB[0], 2) + Math.pow(vecAB[1], 2));

    return distance;
  
  },
  directionFromPoint1to2: function(p1: number[], p2: number[]) {
    let dir = [
      p2[0] - p1[0],
      p2[1] - p1[1]
    ];
    let dir_length = Math.sqrt(Math.pow(dir[0], 2) + Math.pow(dir[1], 2));

    dir = [dir[0]/dir_length, dir[1]/dir_length]; 
  
    return dir;
  },
  randomFromRange: function(min, max){
    return Math.random() * (max - min) + min;
  }
}

export default Tools;