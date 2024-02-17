import { FIGURES, state } from '../constants/index.js';
import { nameFigure, initialRowOfFigure, initialColumnOfFigure } from '../helpers/index.js';
import { firstRotationOfMatrix } from '../rotateFigure/firstRotationOfMatrix.js';
import { generateNextFigure } from '../nextFigure/index.js';

function choosingFigureName() {	
	const { nameNextFigure } = state;
	
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
