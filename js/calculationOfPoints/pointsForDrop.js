import { calculationOfPoints } from './calculationOfPoints.js';

function pointsForDrop() {
  calculationOfPoints(1);
}

function pointsForHardDrop(steps) {
  const points = steps * 2;
  calculationOfPoints(points);
}

export {
  pointsForDrop,
  pointsForHardDrop,
}
