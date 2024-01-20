import { FIGURES } from '../constants.js';
import { randomValue, initialRowOfFigure, initialColumnOfFigure } from '../utils.js';
import { initialMatrixRotate } from '../main.js'

export function generateFigure(figureNames) { 
	const figureNumber = randomValue(0, figureNames.length);
	const name = figureNames[figureNumber];
	const matrix = initialMatrixRotate(FIGURES[name]);
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
