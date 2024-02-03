import { PLAYFIELD_ROWS } from '../constants.js';
import { figure } from '../main.js';
import { calculationOfPoints } from './calculationOfPoints.js';

function pointsForDrop() {
  calculationOfPoints(1);
}

function pointsForHardDrop() {
  const points = rowsCalculation();
  calculationOfPoints(points);
}

function  rowsCalculation() {
  return PLAYFIELD_ROWS - figure.row;
}

export {
  pointsForDrop,
  pointsForHardDrop,
}
