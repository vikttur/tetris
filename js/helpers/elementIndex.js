import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, NEXT_FIELD_COLUMNS } from '/js/constants/index.js';

function elementIndex(row, column) {
	return row * PLAYFIELD_COLUMNS + column;
}

function indexOfNextElement(row, column) {
	return row * NEXT_FIELD_COLUMNS + column;
}

function isValidIndex(cellIndex) {
	if(cellIndex < 0) return;
	if(cellIndex > PLAYFIELD_COLUMNS * PLAYFIELD_ROWS - 1) return;
	return true;
}

export {
	elementIndex,
	indexOfNextElement,
	isValidIndex,
}