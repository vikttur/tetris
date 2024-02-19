import { POINTS_FOR_LINES, state } from '../constants/index.js';
import { calculationOfPoints } from './calculationOfPoints.js';

function pointsForFilledLines(numberOfLines) {
  const points = POINTS_FOR_LINES[numberOfLines];
  calculationOfPoints(points);
  calculationOfLines(numberOfLines);
}

function calculationOfLines(points) {
  const pointsSum = state.quantityLines  + points;
  document.querySelector('.lines').innerHTML = pointsSum;
  saveQuantityLines(pointsSum);
};

function saveQuantityLines(points) {
	state.quantityLines = points;
}

export {
  pointsForFilledLines,
}
