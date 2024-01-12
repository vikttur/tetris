const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const FIGURES = {
	'O': [
		[1, 1],
		[1, 1],
	],
	'T': [
		[1, 1, 1],
		[0, 1, 0],
	],
	'L': [
		[0, 0, 1],
		[1, 1, 1],
	],
	'Lr': [
		[1, 1, 1],
		[0, 0, 1],
	],
	'S': [
		[0, 1, 1],
		[1, 1, 0],
	],
	'Sr': [
		[1, 1, 0],
		[0, 1, 1],
	],
	'I': [
		[1, 1, 1, 1],
	],
};

const figureNames = Object.keys(FIGURES);

let playField = [];
let figure = {};
let isThereMove = true;

function indexElement(row, column) {
	return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayField () {
	createFieldElements();
	createElementsArray();
}

function createFieldElements(){
	const field = document.createElement('ul');
	field.classList.add('field');

	for(let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i += 1) {
		field.append(document.createElement('li'));
		document.querySelector('.tetris').append(field);
	}
}

function createElementsArray(){
	playField = new Array(PLAYFIELD_ROWS)
		.fill()
		.map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
}

function randomValue (max){
	return Math.floor(Math.random() * max);
}

function generateFigure(){   
	const name = figureNames[randomValue(figureNames.length)];
	const matrix = FIGURES[name];
	const height = matrix.length;
	const width =  matrix[0].length;

	const row = 0;
	const column = Number.parseInt((PLAYFIELD_COLUMNS - width) / 2);
	
	figure= {
		name,
		matrix,
		height,
		width,
		row,
		column,
	}
}

generatePlayField();

const cells = document.querySelectorAll('.field li');

// function drawPlayField(){
// 	for(let i = 0; i < PLAYFIELD_ROWS; i += 1){
// 		for(let j = 0; j < PLAYFIELD_COLUMNS; j += 1){
// 			const name = playField[i][j];
// 			const cellIndex = indexElement(i, j);
// 			cells[cellIndex].classList.add(name);
// 		}
// 	}
// }

function deletingDateAttributes(){
	const { width, height, row, column } = figure;

	for(let i = 0; i < height; i += 1){
		for(let j = 0; j < width; j += 1){
			const cellIndex = indexElement(row + i, column + j);
			cells[cellIndex].removeAttribute('data-figure');
		}
	}
}

function drawFigure(){
	const { name, matrix, width, height, row, column } = figure;

	for(let i = 0; i < height; i += 1){
		for(let j = 0; j < width; j += 1){
			if(!matrix[i][j]) continue;
			const cellIndex = indexElement(row + i, column + j);
			cells[cellIndex].classList.add(name);
			cells[cellIndex].setAttribute('data-figure', 'new');
		}
	}
}

function redrawingFigure(){
	// deleteFigure();
	drawFigure();
}

function deleteFigure(){
	const { height, width, row, column } = figure;

	for(let i = 0; i < height; i += 1){
		for(let j = 0; j < width; j += 1){
			const cellIndex = indexElement(row + i, column + j);
			cells[cellIndex].removeAttribute('class');
			cells[cellIndex].removeAttribute('data-figure');
		}
	}
}

generateFigure();
drawFigure();

// function draw(){
// 	cells.forEach(function(cell){cell.removeAttribute('class')});
// 	drawPlayField();
// 	drawFigure();
// 	// redrawingFigure();
// }

// ------------------------------------
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

	if (isThereMove) redrawingFigure(); //draw();
}

function moveFigureDown(){	
	if (figure.row + figure.height === PLAYFIELD_ROWS || isOverlayingFiguresDown()) {
		// fixsingFigure();
		deletingDateAttributes();
		WorkWithFilledRows();
		generateFigure();
		return;
	}

	isThereMove = true;
	permissionToMoveFigure('row', 1);
}

// function fixsingFigure(){
	// const { length, row, column } = figure;

	// for(let i = 0; i < length; i += 1){
	// 	for(let j = 0; j < length; j += 1){
	// 		playField[row + i][column + j] = figureNames[0];
	// 	}
	// }
// }

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
	const { column, width } = figure;

	if (column + width === PLAYFIELD_COLUMNS) {
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
	const { matrix, width, height, row, column } = figure;
	
	for(let i = 0; i < height; i += 1){
		for(let j = 0; j < width; j += 1){
			if(!matrix[i][j]) continue;

			const cellIndex = indexElement(row + i + 1, column + j);
			if(cells[cellIndex].hasAttribute('data-figure')) continue;
			if(cells[cellIndex].hasAttribute('class')) return true;
		}
	}

	return false;	
}

function isOverlayingFiguresToside(offset){
	const { matrix, height, width, row, column } = figure;
	
	for(let i = 0; i < height; i += 1){
		for(let j = 0; j < width; j += 1){
			if(!matrix[i][j]) continue;
			
			const cellIndex = indexElement(row + i, column + j + offset);
			if(cells[cellIndex].hasAttribute('data-figure')) continue;
			if(cells[cellIndex].hasAttribute('class')) return true;
		}
	}

	return false;
}
// -----------------------------------------
function WorkWithFilledRows(){
	const arrayOfFilledRows  = searchForFilledRows();
	if(arrayOfFilledRows.length) removingFilledRows(arrayOfFilledRows);
}

function searchForFilledRows(){
	const { height, row } = figure;
	const arrayOfFilledRows = [];

	for(let i = row; i < row + height; i += 1){
		let quantityOfFilledRows  = 0;

		for(let j = 0; j < PLAYFIELD_COLUMNS; j += 1){
			const cellIndex = indexElement(i, j);
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
				const cellIndexUp = indexElement(i - 1, j); // як бути з першим рядком?
				const cellIndexDown = indexElement(i, j);

				cells[cellIndexDown].classList = cells[cellIndexUp].classList;
			}
		}
	}
}

// ------------------------------------
function rotateFigureLeft(){
	// for(let i = 0; i < height; i += 1){
	// 	for(let j = 0; j < width; j += 1){
	// 		if(!matrix[i][j]) continue;
			
	// 		const cellIndex = indexElement(row + i, column + j + offset);
	// 		if(cells[cellIndex].hasAttribute('data-figure')) continue;
	// 		if(cells[cellIndex].hasAttribute('class')) return true;
	// 	}
	// }
}

function rotateFigureRight(){
	const oldMatrix = figure.matrix;
	const newMatrix = rotateMatrix(figure.matrix);
	deleteFigure();
	figure.matrix = newMatrix;
	console.log(figure.matrix);
	

	// if(isValid()){
	// 	figure.matrix = oldMatrix;
	// }
}

function rotateMatrix(matrixFigure){
	const { height, width } = figure;

	const rotateMatrix = [];	
	rotateMatrix.length = width;
	
	for(let j = 0; j < width; j +=1){	
		rotateMatrix[j] = [];

		for(let i = 0; i < height; i +=1){
			rotateMatrix[j][i] = matrixFigure[height - i - 1][j];
		}
	}

	return rotateMatrix;
}

// ------------------------------------
