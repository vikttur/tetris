import { cells, figure } from '../main.js';
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
	const { matrix } = figure;
	const oldMatrix = matrix;
	const newMatrix = rotateMatrix(matrix, direction);

	figure.matrix = newMatrix;
	
	if(!isPermissionToRotate(figure)) {
		figure.matrix = oldMatrix;
		return;
	}	

	deleteFigure(cells, figure);
}

export {
	rotateFigureLeft,
	rotateFigureRight,
}
