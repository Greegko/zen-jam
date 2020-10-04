let Tools = {
  ispointInsideRectangle: function(p, rect){
    let result = rect[0] <= p[0] && p[0] <= rect[0] + (rect[2] - rect[0]) &&
    rect[1] <= p[1] && p[1] <= rect[1] + (rect[3] - rect[1]);

    return result;
  },
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
  randomFromList: function (array) {
    return array[Math.floor(Math.random() * array.length)];
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
  },
  randomPointInRectangle(rect){
    return [
      Tools.randomFromRange[rect[0], rect[2]],
      Tools.randomFromRange[rect[1], rect[3]]
    ]
  },
  lerp: function (value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
  },
  randomKeyInObj : function (obj) {
    var keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
  }
}

export default Tools;