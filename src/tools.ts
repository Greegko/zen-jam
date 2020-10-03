
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
  }
}

export default Tools;