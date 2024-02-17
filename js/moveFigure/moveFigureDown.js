import { state } from '../constants/index.js';
import { isOverlayingFigures, permissionToMoveFigure } from '../helpers/index.js';
import { generateFigure, deleteFigure, deletingDateAttributes } from '../figure/index.js';
import { searchForFilledRows, removeFilledRows } from '../filledRows/index.js';
import { pointsForFigures, pointsForDrop } from '../calculationOfPoints/index.js';
import { saveInLocalStorage } from '../localStorage/localStorage.js'
import { checkingToMoveDown }  from './checkingMoveFigure.js';

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
	deletingDateAttributes();
	state.figure = generateFigure();
}

function moveFigure(movingValue) {
	deleteFigure();
	permissionToMoveFigure(true);
	state.figure.row += movingValue;
}

export {
  moveFigureDown,
}
