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
		[0, 0, 0],
	],
	'L': [
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 0],
	],
	'Lr': [
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1],
	],
	'S': [
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0],
	],
	'Sr': [
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0],
	],
	'I': [
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
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

function generateFigure(){
	const name = 'L';
	const matrix = FIGURES[name];
	const length =  matrix.length;

	const column = Number.parseInt((PLAYFIELD_COLUMNS - length) / 2);
	const row = 0;

	figure= {
		name,
		matrix,
		column,
		row,
		length,
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

function drawFigure(){
	const { name, matrix, length, row, column } = figure;

	for(let i = 0; i < length; i += 1){
		for(let j = 0; j < length; j += 1){
			if(!matrix[i][j]) continue;
			const cellIndex = indexElement(row + i, column + j);
			cells[cellIndex].classList.add(name);
		}
	}
}

function redrawingFigure(){
	// deleteFigure();
	drawFigure();
}

function deleteFigure(){
	const { length, row, column } = figure;

	for(let i = 0; i < length; i += 1){
		for(let j = 0; j < length; j += 1){
			const cellIndex = indexElement(row + i, column + j);
			cells[cellIndex].removeAttribute('class');
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

document.addEventListener('keydown', onKeyDown);

function onKeyDown(e) {
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
	}

	if (isThereMove) redrawingFigure(); //draw();
}

function moveFigureDown(){	
	if (figure.row + figure.length >= PLAYFIELD_ROWS) {
		const rowToCheck = PLAYFIELD_ROWS - figure.row - 1;

		if(isNotEmptyRow(rowToCheck)) {
			// fixsingFigure();
			generateFigure();
			return;
		}
	}
	
	permissionToMoveFigure('row', 1);
}

function moveFigureLeft(){
	if (figure.column <= 0) {
		const columnToCheck = 0 - figure.column;

		if(isNotEmptyColumn(columnToCheck)) {
			isThereMove = false;
			return;
		}
	}

	permissionToMoveFigure('column', -1);
}

function moveFigureRight(){
	if (figure.column + figure.length >= PLAYFIELD_COLUMNS) {
		const columnToCheck = PLAYFIELD_COLUMNS - figure.column - 1;

		if(isNotEmptyColumn(columnToCheck)) {
			isThereMove = false;
			return;
		}
	}

	permissionToMoveFigure('column', 1);
}

function isNotEmptyColumn(columnToCheck){
	const { matrix, length } = figure;

	for(let i = 0; i < length; i += 1){
		if(!matrix[i][columnToCheck]) continue;
		return true;
	}
}

function isNotEmptyRow(rowToCheck){
	const { matrix, length } = figure;

	for(let j = 0; j < length; j += 1){
		if(!matrix[rowToCheck][j]) continue;
		return true;
	}
}

function permissionToMoveFigure(directionOfMove, displacementValue) {
	isThereMove = true;
	deleteFigure();

	if(directionOfMove === 'row') {
		figure.row += displacementValue;
		return;
	}

	figure.column += displacementValue;
}

// function fixsingFigure(){
	// const { length, row, column } = figure;

	// for(let i = 0; i < length; i += 1){
	// 	for(let j = 0; j < length; j += 1){
	// 		playField[row + i][column + j] = figureNames[0];
	// 	}
	// }
// }