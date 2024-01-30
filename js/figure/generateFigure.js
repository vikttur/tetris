import { FIGURES } from '../constants.js';
import { randomValue, initialRowOfFigure, initialColumnOfFigure } from '../helpers/index.js';
import { firstRotationOfMatrix } from '../rotateFigure/firstRotationOfMatrix.js';

function generateFigure(figureNames) { 
	const figureNumber = randomValue(0, figureNames.length);
	const name = figureNames[figureNumber];
	const matrix = firstRotationOfMatrix(FIGURES[name]);
	const size = matrix.length;
	const row = initialRowOfFigure(matrix, size);
	const column = initialColumnOfFigure(matrix);
	
	return {
		name,
		matrix,
		size,
		row,
		column,
	}
}

export {
	generateFigure,
}
