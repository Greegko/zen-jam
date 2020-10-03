
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
  
  }
}

export default Tools;