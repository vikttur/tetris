import { isOverlayingFigures } from '../helpers/index.js';
import { cells, figure, permissionToMoveFigure, generateNewFigure  } from '../main.js';
import { deleteFigure, deletingDateAttributes } from '../figure/index.js';
import { searchForFilledRows, removeFilledRows } from '../filledRows/index.js';
import { checkingToMoveDown }  from './checkingMoveFigure.js';
import { pointsForFigures, pointsForDrop } from '../calculationOfPoints/index.js';
import { saveInLocalStorage } from '../localStorage/localStorage.js'

function gameOver() {
	permissionToMoveFigure(false);
  console.log('GAME OVER!!!');
	saveInLocalStorage();
};

function moveFigureDown(isCalc) {
	if(!checkingToMoveDown()) {
		stopMotionFigure();
		pointsForFigures();
		return;
	}

	if(isCalc) pointsForDrop();
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
