import { moveFigureDown }  from './moveFigureDown.js';
import { checkingToMoveDown }  from './checkingMoveFigure.js';

function hardDropOfFigure() {
	while(checkingToMoveDown()) {
		moveFigureDown();
	}
}

export {
  hardDropOfFigure,
}