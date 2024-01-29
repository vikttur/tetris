import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from '../constants.js';
import { randomValue, isExitFromFieldToDown, isExitFromFieldToSide, isOverlayingFigures } from '../helpers/index.js';
import { deleteFigure } from '../figure/index.js';

function firstRotationOfMatrix(initialMatrix) {
	const n = randomValue(0, 4);

	for(let i = 0; i < n; i += 1) {
		initialMatrix = rotateMatrix(initialMatrix);
	}

	return initialMatrix; 
}

function rotateFigureRight(cells, figure) {
	const { matrix } = figure;
	const oldMatrix = matrix;
	const newMatrix = rotateMatrix(matrix);

	figure.matrix = newMatrix;
	
	if(!isPermissionToRotate(figure)) {
		figure.matrix = oldMatrix;
		return;
	}	

	deleteFigure(cells, figure);
}

function rotateFigureLeft(cells, figure) {
	const { matrix } = figure;
	const oldMatrix = matrix;
	const newMatrix = rotateMatrix(matrix);

	figure.matrix = newMatrix;
	
	if(!isPermissionToRotate(figure)) {
		figure.matrix = oldMatrix;
		return;
	}	

	deleteFigure(cells, figure);
}

function rotateMatrix(matrixForRotation) {
	const size = matrixForRotation.length;

	const newMatrix = [];	
	newMatrix.length = size;
	
	for(let j = 0; j < size; j +=1) {	
		newMatrix[j] = [];

		for(let i = 0; i < size; i +=1) {
			newMatrix[j][i] = matrixForRotation[i][size - j - 1];
		}
	}

	return newMatrix;
}

function isPermissionToRotate(figure) {
	const { size, row, column } = figure;
	
	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) break;

		if (row + i >= PLAYFIELD_ROWS) {
			if(isExitFromFieldToDown(i)) return;
		}
	}

	for(let j = 0; j < size; j += 1){
		if(column + j < 0 || column + j >= PLAYFIELD_COLUMNS) {
			if(isExitFromFieldToSide(j)) return;
		}
	}

	if(isOverlayingFigures(0, 0)) return;

	return true;
}

export {
	firstRotationOfMatrix,
	rotateFigureRight,
	rotateFigureLeft,
}
