import { moveFigureDown } from '../moveFigure/index.js';
import { drawFigure } from '../figure/drawFigure.js';

let timerId = 0;
let interval = 700;

function startLoopTimer() {
	if(timerId) return;
	timerId = setInterval(loopStep, interval);
}

function loopStep() {
	moveFigureDown(false);
	drawFigure();
}

function stopLoopTimer() {
	timerId = clearInterval(timerId);
}

export {
  startLoopTimer,
	stopLoopTimer,
}
