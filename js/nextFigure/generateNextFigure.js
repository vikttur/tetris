import { FIGURES } from '/js/constants.js';
import { nameFigure } from '../helpers/index.js';
import { drawNextFigure } from './drawNextFigure.js';

let nameNextFigure = '';

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
	nameNextFigure,
	generateNextFigure,
}
