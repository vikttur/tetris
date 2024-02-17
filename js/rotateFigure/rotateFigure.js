import { state } from '../constants/index.js';
import { deleteFigure } from '../figure/index.js';
import { isPermissionToRotate } from './isPermissionToRotate.js';
import { rotateMatrix } from './rotateMatrix.js';

function rotateFigureLeft() {
	rotateFigure('left');
}

function rotateFigureRight() {
	rotateFigure('right');
}

function rotateFigure(direction) {
	const { matrix } = state.figure;
	const oldMatrix = matrix;
	const newMatrix = rotateMatrix(matrix, direction);

	state.figure.matrix = newMatrix;
	
	if(!isPermissionToRotate()) {
		state.figure.matrix = oldMatrix;
		return;
	}	

	deleteFigure();
}

export {
	rotateFigureLeft,
	rotateFigureRight,
}
