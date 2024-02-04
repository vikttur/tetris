import { moveFigureDown }  from './moveFigureDown.js';
import { checkingToMoveDown }  from './checkingMoveFigure.js';
import { pointsForHardDrop } from '../calculationOfPoints/index.js';

function hardDropOfFigure() {
	pointsForHardDrop(dropCycle());
}

function dropCycle() {
	let steps = 0;

	while(checkingToMoveDown()) {
		moveFigureDown(false);
		steps += 1;
	}

	return steps;
}

export {
  hardDropOfFigure,
}
