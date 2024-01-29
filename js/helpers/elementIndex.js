import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from '/js/constants.js';

function elementIndex(row, column) {
	return row * PLAYFIELD_COLUMNS + column;
}

function isValidIndex(cellIndex) {
	if(cellIndex < 0) return;
	if(cellIndex > PLAYFIELD_COLUMNS * PLAYFIELD_ROWS - 1) return;
	return true;
}

export {
	elementIndex,
	isValidIndex,
}