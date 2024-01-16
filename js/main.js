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
	return cellIndex <= PLAYFIELD_COLUMNS * PLAYFIELD_ROWS - 1;
}

function randomValue(min, max) {
	return Math.floor(Math.random() * (max - min) + min);	
}

function CenteringTheFigure(columns, size) {
	return Math.floor((columns - size) / 2);
}

function generateFigure() { 
	const figureNumber = randomValue(0, figureNames.length)
	const name = figureNames[figureNumber];
	const matrix = FIGURES[name];
	const size = matrix.length;
	const row = 1 - size;
	const column = CenteringTheFigure(PLAYFIELD_COLUMNS, size);
	
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
			if(isValidIndex(cellIndex)) cells[cellIndex].removeAttribute('data-figure');
		}
	}
}

function deleteFigure() {
	const { size, row, column } = figure;

	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) continue;

		for(let j = 0; j < size; j += 1) {
			const cellIndex = elementIndex(row + i, column + j);
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
		console.log(isExitFromFieldToDown(rowToCheck));
		if(isExitFromFieldToDown(rowToCheck)) return;
	};

	if(isOverlayingFiguresFromDown()) return;
	return true;
}

function isExitFromFieldToDown(rowToCheck) {
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
		if(i + row < 0) continue;
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

// s-Rotate------------------------------------
function rotateFigureRight() {
	const { matrix } = figure;
	const oldMatrix = matrix;
	const newMatrix = rotateMatrix(matrix);

	figure.matrix = newMatrix;
	deleteFigure();	
	
	// const temp = figure.height;
	// figure.height = figure.width;
	// figure.width = temp;

	// if(figure.width !== figure.height) {
	// 	if(figure.rotate < 3) {
	// 		figure.rotate += 1;
	// 	} else {
	// 		figure.rotate = 0;
	// 	}

	// 	newFigureRow();
	// 	newFigureColumn();
	// }


	// if(isValid()) {
	// 	figure.matrix = oldMatrix;
	// }
}

// function newFigureRow() {
// 	switch(figure.rotate) {
// 		case 0:
// 			figure.row += 1;
// 			break;
// 		case 1:
// 			figure.row -= 1;
// 			break;
// 		case 2:
// 			figure.row += 1;
// 			break;
// 		case 3:
// 			figure.row -= 1;
// 			break;	
// 	}
// }

function rotateMatrix(matrixFigure) {
	const { size } = figure;

	const rotateMatrix = [];	
	rotateMatrix.length = size;
	
	for(let j = 0; j < size; j +=1) {	
		rotateMatrix[j] = [];

		for(let i = 0; i < size; i +=1) {
			rotateMatrix[j][i] = matrixFigure[size - i - 1][j];
		}
	}

	return rotateMatrix;
}
// f-Rotate------------------------------------
