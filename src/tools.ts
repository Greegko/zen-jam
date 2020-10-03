
let Tools = {

  isPointInRect: function(x, y, r1x, r1y, r2x, r2y){
    let x1 = Math.min(r1x, r2x);
    let x2 = Math.max(r1x, r2x);
    let y1 = Math.min(r1y, r2y);
    let y2 = Math.max(r1y, r2y);
    if ((x1 <= x && x <= x2) && (y1 <= y && y <= y2)) {
      return true;
    } else {
    return false;
    }; 
  },
  distanceBetweenTwoPoints: function(p1: number[], p2: number[]){
   
    let vecAB = [p2[0] - p1[0], p2[1] - p1[1]];
    let distance = Math.sqrt(Math.pow(vecAB[0], 2) + Math.pow(vecAB[1], 2));

    return distance;
  
  }
}

export default Tools;