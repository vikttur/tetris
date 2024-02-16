import { POINTS_FOR_LINES } from '../constants/constants.js';
// import { quantityLines, saveQuantityLines } from '../main.js';
import { calculationOfPoints } from './calculationOfPoints.js';

function pointsForFilledLines(numberOfLines) {
  const points = POINTS_FOR_LINES[numberOfLines];
  calculationOfPoints(points);
  calculationOfLines(numberOfLines);
}

function calculationOfLines(points) {
  const pointsSum = 555 + points; //quantityLines 
  document.querySelector('.lines').innerHTML = pointsSum;
  // saveQuantityLines(pointsSum);
};

export {
  pointsForFilledLines,
}
