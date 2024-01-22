import { randomValue, elementIndex } from './helpers/index.js'
import { deleteFigure } from './figure/index.js'


export function firstRotationOfMatrix(initialMatrix) {
	const n = randomValue(0, 4);

	for(let i = 0; i < n; i += 1) {
		initialMatrix = rotateMatrix(initialMatrix);
	}

	return initialMatrix; 
}

export function rotateFigureRight(cells, figure) {
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

export function rotateFigureLeft(cells, figure) {
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
	const { matrix, size, row, column } = figure;
	
	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) continue;
		// if(isExitFromFieldToDown(i)) return;

		for(let j = 0; j < size; j += 1){
			if(!matrix[i][j]) continue;
			// if(isExitFromFieldToSide(j)) return;

			const cellIndex = elementIndex(row + i + 1, column + j);
			// if(cells[cellIndex].hasAttribute('class')) return;
		}
	}

	return true;
}
