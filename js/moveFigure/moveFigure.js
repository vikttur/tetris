import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from '../constants.js';
import { cells, figure, generateNewFigure } from '../main.js';
import { deleteFigure, deletingDateAttributes } from '../figure/index.js';
import { searchForFilledRows, removingFilledRows } from '../removeFilledRows.js';
import { isExitFromFieldToDown, isExitFromFieldToSide, isOverlayingFigures } from '../helpers/index.js';

export let isThereMove = true;



function gameOver() {
  console.log('GAME OVER!!!');
};

// f-Down------------------------------------
export function moveFigureDown() {
	if(!checkingToMoveDown()) {
		deletingDateAttributes(cells, figure);
		WorkWithFilledRows();
		generateNewFigure();

		if(isOverlayingFigures(0, 0)) {
			isThereMove = false;
			gameOver(); 
		}

		return;
	}

	isThereMove = true;
	permissionToMoveFigure('row', 1);
}

function checkingToMoveDown() {
	const { row, size } = figure;

	if (row + size >= PLAYFIELD_ROWS) {
		const rowToCheck = PLAYFIELD_ROWS - row - 1;
		if(isExitFromFieldToDown(rowToCheck)) return;
	};

	if(isOverlayingFigures(1, 0)) return;
	return true;
}

// f-Down------------------------------------
// s-Left or Right------------------------------------
export function moveFigureLeft() {
	if(!checkingToMoveLeft()) return;

	isThereMove = true;
	permissionToMoveFigure('column', -1);
}

export function moveFigureRight() {
	if(!checkingToMoveRight()) return;

	isThereMove = true;
	permissionToMoveFigure('column', 1);
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

function checkingToMoveRight() {
	const { column, size } = figure;

	if (column + size >= PLAYFIELD_COLUMNS) {
		const columnToCheck = PLAYFIELD_COLUMNS - column - 1;
		if(isExitFromFieldToSide(columnToCheck)) return;
	}

	if(isOverlayingFigures(0, 1)) return;
	return true;
}

// f-Left or Right------------------------------------
// s-Down, Left or Right------------------------------------
function permissionToMoveFigure(directionOfMove, displacementValue) {
	deleteFigure(cells, figure);

	if(directionOfMove === 'row') {
		figure.row += displacementValue;
		return;
	}

	figure.column += displacementValue;
}

function WorkWithFilledRows() {
	const arrayOfFilledRows  = searchForFilledRows();
	if(arrayOfFilledRows.length) removingFilledRows(arrayOfFilledRows);
}
// f-Down, Left or Right------------------------------------
