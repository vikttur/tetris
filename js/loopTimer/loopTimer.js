import { state } from '../constants/index.js';
import { moveFigureDown } from '../moveFigure/index.js';
import { drawFigure } from '../figure/index.js';
import { startSetLocalStorage } from '../localStorage/index.js';

let timerId = 0;

function startLoopTimer() {
	if(timerId) return;
	timerId = setInterval(loopStep, state.interval);
	startSetLocalStorage('hightScore', 0);
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
