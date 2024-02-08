import { FIGURES } from '../constants.js';
import { randomValue, initialRowOfFigure, initialColumnOfFigure } from '../helpers/index.js';
import { figureNames } from '../main.js';
import { drawNextFigure } from './drawFigure.js';
import { firstRotationOfMatrix } from '../rotateFigure/firstRotationOfMatrix.js';

let nameNextFigure = '';

function choosingFigureName() {	
	if(!nameNextFigure) return nameFigure();
	return nameNextFigure;
}

function nameFigure() {
	const figureNumber = randomValue(0, figureNames.length);
	return figureNames[figureNumber];
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

function generateNextFigure() {
	const nextFigure = createNextFigure(); 
	drawNextFigure(nextFigure);
}

function createNextFigure() {
	nameNextFigure = nameFigure();
	const matrix = FIGURES[nameNextFigure];
	const size = matrix.length;

	return {
		name: nameNextFigure,
		matrix,
		size,
	}
}

export {
	generateFigure,
	generateNextFigure,
}
