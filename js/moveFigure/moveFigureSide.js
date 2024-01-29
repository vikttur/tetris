import { cells, figure, permissionToMoveFigure } from '../main.js';
import { deleteFigure } from '../figure/index.js';
import { checkingToMoveRight, checkingToMoveLeft }  from './checkingMoveFigure.js';

function moveFigureRight() {
	if(!checkingToMoveRight()) return;
	moveFigureSide(1);
}

function moveFigureLeft() {
	if(!checkingToMoveLeft()) return;
	moveFigureSide(-1);
}

function moveFigureSide(movingValue) {
	deleteFigure(cells, figure);
	permissionToMoveFigure(true);
	figure.column += movingValue;
}

export {
	moveFigureRight,
	moveFigureLeft,
}
