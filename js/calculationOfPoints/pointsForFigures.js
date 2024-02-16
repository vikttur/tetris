import { calculationOfPoints } from './calculationOfPoints.js';
// import { quantityFigure, saveQuantityFigure } from '../main.js'; 

function pointsForFigures() {
  calculationOfPoints(1);
  calculationOfFigures(1);
}

function calculationOfFigures(points) {
  const pointsSum = 555 + points; //quantityFigure
  document.querySelector('.figures').innerHTML = pointsSum;
  // saveQuantityFigure(pointsSum);
};

export {
  pointsForFigures,
}

