import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from '../constants.js';
import { cells, figure, generateNewFigure } from '../main.js';
import { elementIndex } from '../helpers/index.js';
import { deleteFigure, deletingDateAttributes } from '../figure/index.js';
import { searchForFilledRows, removingFilledRows } from '../removeFilledRows.js';

export let isThereMove = true;

// f-Down------------------------------------
export function moveFigureDown() {
	if(!checkingToMoveDown()) {
		deletingDateAttributes(cells, figure);
		WorkWithFilledRows();
		generateNewFigure();
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

	if(isOverlayingFiguresFromDown()) return;
	return true;
}

export function isExitFromFieldToDown(rowToCheck) { //is Outside Bottom border
	const { matrix, size } = figure;

	for(let j = 0; j < size; j += 1) {
		if(!matrix[rowToCheck][j]) continue;
		return true;	
	}
}

function isOverlayingFiguresFromDown() {
	const { matrix, size, row, column } = figure;
	
	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) continue;

		for(let j = 0; j < size; j += 1){
			if(!matrix[i][j]) continue;

			const cellIndex = elementIndex(row + i + 1, column + j);
			if(cells[cellIndex].hasAttribute('data-figure')) continue;
			if(cells[cellIndex].hasAttribute('class')) return true;
		}
	}

	return false;	
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

	if(isOverlayingFigures(-1)) return false;
	return true;
}

function checkingToMoveRight() {
	const { column, size } = figure;

	if (column + size >= PLAYFIELD_COLUMNS) {
		const columnToCheck = PLAYFIELD_COLUMNS - column - 1;
		if(isExitFromFieldToSide(columnToCheck)) return;
	}

	if(isOverlayingFigures(1)) return;
	return true;
}

export function isExitFromFieldToSide(columnToCheck) {
	const { matrix, size } = figure;

	for(let i = 0; i < size; i += 1) {
		if(!matrix[i][columnToCheck]) continue;
		return true;	
	}
}

export function isOverlayingFigures(offset) {
	const { matrix, size, row, column } = figure;
	
	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) continue;

		for(let j = 0; j < size; j += 1) {
			if(!matrix[i][j]) continue;
			
			const cellIndex = elementIndex(row + i, column + j + offset);
			if(cells[cellIndex].hasAttribute('data-figure')) continue;
			if(cells[cellIndex].hasAttribute('class')) return true;
		}
	}

	return false;
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
