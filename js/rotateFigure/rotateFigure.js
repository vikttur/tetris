import { deleteFigure } from '../figure/index.js';
import { isPermissionToRotate } from './isPermissionToRotate.js';
import { rotateMatrix } from './rotateMatrix.js';

function rotateFigure(cells, figure, direction) {
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
	rotateFigure,
}
