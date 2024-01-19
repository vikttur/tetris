import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from './constants.js';

export function randomValue(min, max) {
	return Math.floor(Math.random() * (max - min) + min);	
}

export function elementIndex(row, column) {
	return row * PLAYFIELD_COLUMNS + column;
}

export function isValidIndex(cellIndex) {
	if(cellIndex < 0) return;
	if(cellIndex > PLAYFIELD_COLUMNS * PLAYFIELD_ROWS - 1) return;
	return true;
}

export function initialRowOfFigure(matrix, size) {
	let row = 1;

	for(let i = size - 1; i > 0; i -= 1) {
		for(let j = 0; j < size; j += 1) {
			if(matrix[i][j]) return row - size;
		}

		row += 1;
	}
}

export function initialColumnOfFigure(matrix) {
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