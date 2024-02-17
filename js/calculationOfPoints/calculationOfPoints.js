import { state } from '../constants/index.js';

let pointsSum = 0;

function calculationOfPoints (points) {
  pointsSum += points;
  document.querySelector('.score').innerHTML = pointsSum;
  savePoints(pointsSum);
}

function savePoints(points) {
  state.currentScore = points;
}

export {
  calculationOfPoints,
}
