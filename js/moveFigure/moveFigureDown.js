import { isOverlayingFigures } from '../helpers/index.js';
import { cells, figure, permissionToMoveFigure, generateNewFigure  } from '../main.js';
import { deleteFigure, deletingDateAttributes } from '../figure/index.js';
import { searchForFilledRows, removeFilledRows } from '../FilledRows/index.js';
import { checkingToMoveDown }  from './checkingMoveFigure.js';

function gameOver() {
	permissionToMoveFigure(false);
  console.log('GAME OVER!!!');
};

function moveFigureDown() {
	if(!checkingToMoveDown()) {
		stopMotionFigure();
		return;
	}

	moveFigure(1);
}

function stopMotionFigure(){
	FindAndDeleteFilledRows();
	newFigure();
	if(isOverlayingFigures(0, 0)) gameOver(); 
}

function FindAndDeleteFilledRows() {
	const arrayOfFilledRows  = searchForFilledRows();
	if(arrayOfFilledRows.length) removeFilledRows(arrayOfFilledRows);
}

function newFigure() {
	deletingDateAttributes(cells, figure);
	generateNewFigure();
}

function moveFigure(movingValue) {
	deleteFigure(cells, figure);
	permissionToMoveFigure(true);
	figure.row += movingValue;
}

export {
  moveFigureDown,
}
