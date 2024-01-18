import { 	PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, FIGURES } from './constants.js';
import { refs } from './refs.js';

const { cells } = refs;

const figureNames = Object.keys(FIGURES);

let figure = {};
let isThereMove = true;

function elementIndex(row, column) {
	return row * PLAYFIELD_COLUMNS + column;
}

function isValidIndex(cellIndex) {
	if(cellIndex < 0) return;
	if(cellIndex > PLAYFIELD_COLUMNS * PLAYFIELD_ROWS - 1) return;
	return true;
}

function randomValue(min, max) {
	return Math.floor(Math.random() * (max - min) + min);	
}

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

function generateFigure() { 
	const figureNumber = 2;//randomValue(0, figureNames.length);
	const name = figureNames[figureNumber];
	const matrix = initialMatrixRotate(FIGURES[name]);
	const size = matrix.length;
	const row = initialRowOfFigure(matrix, size);
	const column = initialColumnOfFigure(matrix);
	
	figure = {
		name,
		matrix,
		size,
		row,
		column,
	}
}

function drawFigure() {
	const { name, matrix, size, row, column } = figure;

	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) continue;

		for(let j = 0; j < size; j += 1) {
			if(!matrix[i][j]) continue;
			const cellIndex = elementIndex(row + i, column + j);
			if(!isValidIndex(cellIndex)) continue;
			cells[cellIndex].classList.add(name);
			cells[cellIndex].setAttribute('data-figure', 'new');
		}
	}
}

function redrawingFigure() {
	drawFigure();
}

function deletingDateAttributes() {
	const { size, row, column } = figure;

	for(let i = 0; i < size; i += 1) {
		for(let j = 0; j < size; j += 1) {
			const cellIndex = elementIndex(row + i, column + j);
			if(!isValidIndex(cellIndex)) continue;
			cells[cellIndex].removeAttribute('data-figure');
		}
	}
}

function deleteFigure() {
	const { size, row, column } = figure;

	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) continue;

		for(let j = 0; j < size; j += 1) {
			const cellIndex = elementIndex(row + i, column + j);
			if(!isValidIndex(cellIndex)) continue;
			cells[cellIndex].removeAttribute('class');
			cells[cellIndex].removeAttribute('data-figure');
		}
	}
}

generateFigure();

drawFigure();

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

	if (isThereMove) redrawingFigure(); 
}
// f-keydown------------------------------------
// f-Down------------------------------------
function moveFigureDown() {
	if(!checkingToMoveDown()) {
		deletingDateAttributes();
		WorkWithFilledRows();
		generateFigure();
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
	deleteFigure();

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

function initialMatrixRotate(initialMatrix) {
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

	deleteFigure();
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
