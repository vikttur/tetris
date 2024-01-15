import { 	PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, FIGURES } from './constants.js';

const figureNames = Object.keys(FIGURES);

let figure = {};
let isThereMove = true;

function elementIndex(row, column) {
	return row * PLAYFIELD_COLUMNS + column;
}

function randomValue (min, max){
	return Math.floor(Math.random() * (max - min) + min);	
}

// s-generatePlayField------------------------------
function generatePlayField(){
	const field = createField();
	createFieldElements(field);
	addPlayFieldInDOM(field);
}

function createField(){
	const field = document.createElement('ul');
	field.classList.add('field');
	return field;
}

function createFieldElements(field){
	for(let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i += 1) {
		field.append(document.createElement('li'));
	}
}

function addPlayFieldInDOM(field){
	document.querySelector('.tetris').append(field);
};
// f-generatePlayField------------------------------

function generateFigure(){   
	const name = figureNames[randomValue(0, figureNames.length)];
	const matrix = FIGURES[name];
	const size = matrix.length;
	const row = 1 - size;
	const column = Math.floor((PLAYFIELD_COLUMNS - size) / 2);
	
	figure = {
		name,
		matrix,
		size,
		row,
		column,
	}
}

function drawFigure(){
	const { name, matrix, size, row, column } = figure;

	for(let i = 0; i < size; i += 1){
		if(i + row < 0) continue;

		for(let j = 0; j < size; j += 1){
			if(!matrix[i][j]) continue;
			const cellIndex = elementIndex(row + i, column + j);
			cells[cellIndex].classList.add(name);
			cells[cellIndex].setAttribute('data-figure', 'new');
		}
	}
}

function redrawingFigure(){
	drawFigure();
}

function deletingDateAttributes(){
	const { size, row, column } = figure;

	for(let i = 0; i < size; i += 1){
		for(let j = 0; j < size; j += 1){
			const cellIndex = elementIndex(row + i, column + j);
			cells[cellIndex].removeAttribute('data-figure');
		}
	}
}

function deleteFigure(){
	const { size, row, column } = figure;

	for(let i = 0; i < size; i += 1){
		if(i + row < 0) continue;

		for(let j = 0; j < size; j += 1){
			const cellIndex = elementIndex(row + i, column + j);
			cells[cellIndex].removeAttribute('class');
			cells[cellIndex].removeAttribute('data-figure');
		}
	}
}

generatePlayField();

const cells = document.querySelectorAll('.field li');

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
			console.log(555);
			rotateFigureLeft();
			break;
	}

	if (isThereMove) redrawingFigure(); 
}

function moveFigureDown(){	
	if (figure.row + figure.size === PLAYFIELD_ROWS || isOverlayingFiguresDown()) {
		deletingDateAttributes();
		WorkWithFilledRows();
		generateFigure();
		return;
	}

	isThereMove = true;
	permissionToMoveFigure('row', 1);
}

function moveFigureLeft(){
	const { column } = figure;

	if(column === 0) {
		isThereMove = false;
		return;
	}

	if(isOverlayingFiguresToside(-1)) return;

	isThereMove = true;
	permissionToMoveFigure('column', -1);
}

function moveFigureRight(){
	const { column, size } = figure;

	if (column + size === PLAYFIELD_COLUMNS) {
		isThereMove = false;
		return;
	}
	
	if(isOverlayingFiguresToside(1)) return;

	isThereMove = true;
	permissionToMoveFigure('column', 1);
}

function permissionToMoveFigure(directionOfMove, displacementValue) {
	deleteFigure();

	if(directionOfMove === 'row') {
		figure.row += displacementValue;
		return;
	}

	figure.column += displacementValue;
}
 
function isOverlayingFiguresDown(){
	const { matrix, size, row, column } = figure;
	
	for(let i = 0; i < size; i += 1){
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

function isOverlayingFiguresToside(offset){
	const { matrix, size, row, column } = figure;
	
	for(let i = 0; i < size; i += 1){
		if(i + row < 0) continue;

		for(let j = 0; j < size; j += 1){
			if(!matrix[i][j]) continue;
			
			const cellIndex = elementIndex(row + i, column + j + offset);
			if(cells[cellIndex].hasAttribute('data-figure')) continue;
			if(cells[cellIndex].hasAttribute('class')) return true;
		}
	}

	return false;
}

function WorkWithFilledRows(){
	const arrayOfFilledRows  = searchForFilledRows();
	if(arrayOfFilledRows.length) removingFilledRows(arrayOfFilledRows);
}

function searchForFilledRows(){
	const { size, row } = figure;
	const arrayOfFilledRows = [];

	for(let i = row; i < row + size; i += 1){
		let quantityOfFilledRows  = 0;

		for(let j = 0; j < PLAYFIELD_COLUMNS; j += 1){
			const cellIndex = elementIndex(i, j);
			if(cells[cellIndex].hasAttribute('class')) quantityOfFilledRows += 1;
		}

		if(quantityOfFilledRows === PLAYFIELD_COLUMNS) arrayOfFilledRows.push(i);
	}

	return arrayOfFilledRows;
}

function removingFilledRows(array){
	for(let n = 0; n < array.length; n += 1){
		const lastRow = array;

		for(let i = lastRow; i > 0; i -= 1){
			for(let j = 0; j < PLAYFIELD_COLUMNS; j += 1){
				const cellIndexUp = elementIndex(i - 1, j); // як бути з першим рядком?
				const cellIndexDown = elementIndex(i, j);

				cells[cellIndexDown].classList = cells[cellIndexUp].classList;
			}
		}
	}
}
// f-keydown------------------------------------
// s-Rotate------------------------------------
function rotateFigureRight(){
	const { matrix } = figure;
	const oldMatrix = matrix;
	const newMatrix = rotateMatrix(matrix);

	figure.matrix = newMatrix;
	deleteFigure();	
	
	// const temp = figure.height;
	// figure.height = figure.width;
	// figure.width = temp;

	// if(figure.width !== figure.height){
	// 	if(figure.rotate < 3) {
	// 		figure.rotate += 1;
	// 	} else {
	// 		figure.rotate = 0;
	// 	}

	// 	newFigureRow();
	// 	newFigureColumn();
	// }


	// if(isValid()){
	// 	figure.matrix = oldMatrix;
	// }
}

// function newFigureRow(){
// 	switch(figure.rotate){
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

function rotateMatrix(matrixFigure){
	const { size } = figure;

	const rotateMatrix = [];	
	rotateMatrix.length = size;
	
	for(let j = 0; j < size; j +=1){	
		rotateMatrix[j] = [];

		for(let i = 0; i < size; i +=1){
			rotateMatrix[j][i] = matrixFigure[size - i - 1][j];
		}
	}

	return rotateMatrix;
}
// f-Rotate------------------------------------
