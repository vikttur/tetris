import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, FIGURES } from './constants.js';
import { generatePlayField, elementsOfPlayField } from './playField/index.js';
import { generateFigure, drawFigure, deleteFigure, deletingDateAttributes } from './figure/index.js'
import { randomValue, elementIndex, isValidIndex} from './helpers/index.js';

let isThereMove = true;
let figure = {};

generatePlayField();
const cells = elementsOfPlayField();

const figureNames = Object.keys(FIGURES);
figure = generateFigure(figureNames);

drawFigure(cells, figure);

// s-keydown------------------------------------
document.addEventListener('keydown', onPressKay);

function onPressKay(e) {
	switch(e.key){
		case 'ArrowDown':
			moveFigureDown();
			break;
		case 'ArrowLeft':
			moveFigureLeft();
			break;
		case 'ArrowRight':
			moveFigureRight();
			break;
		case 'ArrowUp':
			rotateFigureRight();
			break;	
		case 'Z':
			// console.log(555);
			// rotateFigureLeft();
			break;
	}

	if (isThereMove) drawFigure(cells, figure); 
}
// f-keydown------------------------------------
// f-Down------------------------------------
function moveFigureDown() {
	if(!checkingToMoveDown()) {
		deletingDateAttributes(cells, figure);
		WorkWithFilledRows();
		figure = generateFigure(figureNames);
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

function isExitFromFieldToDown(rowToCheck) { //is Outside Bottom border
	const { matrix, size, row, column } = figure;

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
function moveFigureLeft() {
	if(!checkingToMoveLeft()) return;

	isThereMove = true;
	permissionToMoveFigure('column', -1);
}

function moveFigureRight() {
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

	if(isOverlayingFiguresFromSide(-1)) return false;
	return true;
}

function checkingToMoveRight() {
	const { column, size } = figure;

	if (column + size >= PLAYFIELD_COLUMNS) {
		const columnToCheck = PLAYFIELD_COLUMNS - column - 1;
		if(isExitFromFieldToSide(columnToCheck)) return;
	}

	if(isOverlayingFiguresFromSide(1)) return;
	return true;
}

function isExitFromFieldToSide(columnToCheck) {
	const { matrix, size, row, column } = figure;

	for(let i = 0; i < size; i += 1) {
		if(!matrix[i][columnToCheck]) continue;
		return true;	
	}
}

function isOverlayingFiguresFromSide(offset) {
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

// s-FilledRows------------------------------------
function searchForFilledRows() {
	const { size, row } = figure;
	const arrayOfFilledRows = [];

	for(let i = row; i < row + size; i += 1) {
		let quantityOfFilledRows  = 0;

		for(let j = 0; j < PLAYFIELD_COLUMNS; j += 1) {
			const cellIndex = elementIndex(i, j);
			
			if(isValidIndex(cellIndex)) {
				if(cells[cellIndex].hasAttribute('class')) quantityOfFilledRows += 1;
			}
		}

		if(quantityOfFilledRows === PLAYFIELD_COLUMNS) arrayOfFilledRows.push(i);
	}

	return arrayOfFilledRows;
}

function removingFilledRows(array) {
	for(let n = 0; n < array.length; n += 1) {
		const lastRow = array;

		for(let i = lastRow; i > 0; i -= 1) {
			for(let j = 0; j < PLAYFIELD_COLUMNS; j += 1) {
				const cellIndexUp = elementIndex(i - 1, j); // як бути з першим рядком?
				const cellIndexDown = elementIndex(i, j);

				cells[cellIndexDown].classList = cells[cellIndexUp].classList;
			}
		}
	}
}
// f-FilledRows------------------------------------
// s-Rotate------------------------------------
export function initialMatrixRotate(initialMatrix) {
	const n = randomValue(0, 4);

	for(let i = 0; i < n; i += 1) {
		initialMatrix = rotateMatrix(initialMatrix);
	}

	return initialMatrix; 
}

function rotateFigureRight() {
	const { matrix } = figure;
	const oldMatrix = matrix;
	const newMatrix = rotateMatrix(matrix);

	figure.matrix = newMatrix;
	
	if(!isPermissionToRotate()) {
		figure.matrix = oldMatrix;
		return;
	}	

	deleteFigure(cells, figure);
}

function isPermissionToRotate() {
	const { matrix, size, row, column } = figure;
	
	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) continue;
		// if(isExitFromFieldToDown(i)) return;

		for(let j = 0; j < size; j += 1){
			if(!matrix[i][j]) continue;
			// if(isExitFromFieldToSide(j)) return;

			const cellIndex = elementIndex(row + i + 1, column + j);
			// if(cells[cellIndex].hasAttribute('class')) return;
		}
	}

	return true;
}

function rotateMatrix(matrixForRotation) {
	const size = matrixForRotation.length;

	const newMatrix = [];	
	newMatrix.length = size;
	
	for(let j = 0; j < size; j +=1) {	
		newMatrix[j] = [];

		for(let i = 0; i < size; i +=1) {
			newMatrix[j][i] = matrixForRotation[size - i - 1][j];
		}
	}

	return newMatrix;
}
// f-Rotate------------------------------------
