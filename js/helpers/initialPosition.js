import { PLAYFIELD_COLUMNS } from '../constants/index.js';

function initialRowOfFigure(matrix, size) {
	let row = 1;

	for(let i = size - 1; i > 0; i -= 1) {
		for(let j = 0; j < size; j += 1) {
			if(matrix[i][j]) return row - size;
		}

		row += 1;
	}
}

function initialColumnOfFigure(matrix) {
	const adjustment = columnAdjustment(matrix);
	return Math.floor((PLAYFIELD_COLUMNS - matrix.length) / 2) + adjustment;
}

function columnAdjustment(matrix) {
	const j = matrix.length;

	for(let i = 0; i < j; i += 1) {
		if(matrix[i][j - 1]) return 0;
	}

	return 1;
}

export {
	initialRowOfFigure,
	initialColumnOfFigure
}
