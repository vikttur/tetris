import { state } from '../constants/index.js';
import { calculationOfPoints } from './calculationOfPoints.js';

function pointsForFigures() {
  calculationOfPoints(1);
  calculationOfFigures(1);
}

function calculationOfFigures(points) {
  const pointsSum = state.quantityFigure + points;
  document.querySelector('.figures').innerHTML = pointsSum;
  saveQuantityFigure(pointsSum);
};

function saveQuantityFigure(points) {
	state.quantityFigure = points;
}

export {
  pointsForFigures,
}

