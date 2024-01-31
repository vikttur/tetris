let pointsSum = 0;

function calculationOfPoints (points) {
  pointsSum += points;
  document.querySelector('.balls').innerHTML = pointsSum;
}

export {
  calculationOfPoints,
}
