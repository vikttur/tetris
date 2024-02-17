import { FIGURES, state } from '../constants/index.js';
import { nameFigure } from '../helpers/index.js';
import { drawNextFigure } from './drawNextFigure.js';

function generateNextFigure() {
	const nextFigure = createNextFigure(); 
	drawNextFigure(nextFigure);
}

function createNextFigure() {
	state.nameNextFigure = nameFigure();
	const matrix = FIGURES[state.nameNextFigure];
	const size = matrix.length;

	return {
		name: state.nameNextFigure,
		matrix,
		size,
	}
}

export {
	generateNextFigure,
}
