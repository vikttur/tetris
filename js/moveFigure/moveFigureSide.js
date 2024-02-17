import { state } from '../constants/index.js';
import { permissionToMoveFigure } from '../helpers/index.js';
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
	deleteFigure();
	permissionToMoveFigure(true);
	state.figure.column += movingValue;
}

export {
	moveFigureRight,
	moveFigureLeft,
}
