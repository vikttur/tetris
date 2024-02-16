// import { savePoints } from '../main.js';

let pointsSum = 0;

function calculationOfPoints (points) {
  pointsSum += points;
  document.querySelector('.score').innerHTML = pointsSum;
  // savePoints(pointsSum);
}

export {
  calculationOfPoints,
}
