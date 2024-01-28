import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from '/js/constants.js';

export function elementIndex(row, column) {
	return row * PLAYFIELD_COLUMNS + column;
}

export function isValidIndex(cellIndex) {
	if(cellIndex < 0) return;
	if(cellIndex > PLAYFIELD_COLUMNS * PLAYFIELD_ROWS - 1) return;
	return true;
}