import { POINTS_FOR_LINES } from '../constants.js';
import { calculationOfPoints } from './calculationOfPoints.js';

function pointsForFilledLines(numberOfLines) {
  calculationOfPoints(POINTS_FOR_LINES[numberOfLines]);
}

export {
  pointsForFilledLines,
}
