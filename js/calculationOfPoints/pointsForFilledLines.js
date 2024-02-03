import { calculationOfPoints } from './calculationOfPoints.js';

let points = 0;
 
function pointsForFilledLines(numberOfLines) {
  console.log(numberOfLines);
  switch(numberOfLines){
  case 1:
    points = 100;
    break;
  case 2:
    points = 300;
    break;
  case 3:
    points = 700;
    break;
  case 4:
    points = 1500;
    break;
  }

  calculationOfPoints(points);
}

export {
  pointsForFilledLines,
}
