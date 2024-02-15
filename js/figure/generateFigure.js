import { FIGURES } from '../constants/constants.js';
import { nameFigure, initialRowOfFigure, initialColumnOfFigure } from '../helpers/index.js';
import { firstRotationOfMatrix } from '../rotateFigure/firstRotationOfMatrix.js';
import { nameNextFigure, generateNextFigure } from '../nextFigure/index.js';

function choosingFigureName() {	
	if(!nameNextFigure) return nameFigure();
	return nameNextFigure;
}

function generateFigure() { 
	const figure = generateGameFigure();
	generateNextFigure(); 
	return figure;
}

function generateGameFigure() { 	
	const name =  choosingFigureName();
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
