import { POINTS_FOR_LINES } from '../constants.js';
import { quantityLines, saveQuantityLines } from '../main.js';
import { calculationOfPoints } from './calculationOfPoints.js';

function pointsForFilledLines(numberOfLines) {
  const points = POINTS_FOR_LINES[numberOfLines];
  calculationOfPoints(points);
  calculationOfLines(numberOfLines);
}

function calculationOfLines(points) {
  const pointsSum = quantityLines + points;
  document.querySelector('.lines').innerHTML = pointsSum;
  saveQuantityLines(pointsSum);
};

export {
  pointsForFilledLines,
}
