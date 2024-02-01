import { moveFigureDown } from '../moveFigure/index.js';
import { drawFigure } from '../figure/drawFigure.js';

let timerId = 0;
let interval = 700;

function startLoopTimer() {
	timerId = setInterval(loopStep, interval);
}

function loopStep() {
	moveFigureDown();
	drawFigure();
}

function stopLoopTimer() {
	clearInterval(timerId);
}

export {
  startLoopTimer,
	stopLoopTimer,
}
