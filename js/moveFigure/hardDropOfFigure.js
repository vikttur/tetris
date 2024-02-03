import { moveFigureDown }  from './moveFigureDown.js';
import { checkingToMoveDown }  from './checkingMoveFigure.js';
import { pointsForHardDrop } from '../calculationOfPoints/index.js';

function hardDropOfFigure() {
	pointsForHardDrop();

	while(checkingToMoveDown()) {
		moveFigureDown();
	}
}

export {
  hardDropOfFigure,
}