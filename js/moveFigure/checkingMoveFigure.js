import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from '../constants.js';
import { isExitFromFieldToDown, isExitFromFieldToSide, isOverlayingFigures } from '../helpers/index.js';
import { figure } from '../main.js';

function checkingToMoveDown() {
	const { row, size } = figure;

	if (row + size >= PLAYFIELD_ROWS) {
		const rowToCheck = PLAYFIELD_ROWS - row - 1;
		if(isExitFromFieldToDown(rowToCheck)) return;
	};

	if(isOverlayingFigures(1, 0)) return;
	return true;
}

function checkingToMoveRight() {
	const { column, size } = figure;

	if (column + size >= PLAYFIELD_COLUMNS) {
		const columnToCheck = PLAYFIELD_COLUMNS - column - 1;
		if(isExitFromFieldToSide(columnToCheck)) return;
	}

	if(isOverlayingFigures(0, 1)) return;
	return true;
}

function checkingToMoveLeft() {
	const { column } = figure;

	if(column <= 0) {
		const columnToCheck = 0 - column;
		if(isExitFromFieldToSide(columnToCheck)) return;
	}

	if(isOverlayingFigures(0, -1)) return false;
	return true;
}

export {
  checkingToMoveDown,
  checkingToMoveRight,
  checkingToMoveLeft,
}
