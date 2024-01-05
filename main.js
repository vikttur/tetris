const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const FIGURES = {
	'O': [
		[1, 1],
		[1, 1]
	],
	'T': [
		[1, 1, 1],
		[0, 1, 0],
		[0, 0, 0]
	],
	'L': [
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	'Lr': [
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	],
	'S': [
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	'Sr': [
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	'I': [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1]
	],
};

const figureNames = Object.keys(FIGURES);

let playField = [];
let figure = {};

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
	const name = 'O';
	const matrix = FIGURES[name];
	const length =  matrix.length;

	const column = 4;
	const row = 2;

	figure= {
		name,
		matrix,
		column,
		row,
		length,
	}
}

generatePlayField();
generateFigure();

const cells = document.querySelectorAll('.field li');

function drawPlayField(){
	for(let row = 0; row < PLAYFIELD_ROWS; row++){
		for(let column = 0; column < PLAYFIELD_COLUMNS; column++){
			const name = playField[row][column];
			const cellIndex = indexElement(row, column);
			cells[cellIndex].classList.add(name);
		}
	}
}

function drawFigure(){
	const name = figure.name;
	const figureMatrixSize = figure.length;

	for(let row = 0; row < figureMatrixSize; row += 1){
		for(let column = 0; column < figureMatrixSize; column += 1){
			const cellIndex = indexElement(figure.row + row, figure.column + column);
			cells[cellIndex].classList.add(name);
		}
	}
}

let isThereMove = true;
drawFigure();

function draw(){
	cells.forEach(function(cell){cell.removeAttribute('class')});
	drawPlayField();
	drawFigure();
}

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

	if (isThereMove) draw();
}

function moveFigureDown(){
	if (figure.row + figure.length >= PLAYFIELD_ROWS) return fixsingFigure();

	isThereMove = true;
	figure.row += 1;
}

function moveFigureLeft(){
	if (figure.column <= 0) return isThereMove = false;

	isThereMove = true;
	figure.column -= 1;
}

function moveFigureRight(){
	if (figure.column + figure.length >= PLAYFIELD_COLUMNS) return isThereMove = false;

	isThereMove = true;
	figure.column += 1;
}

function fixsingFigure(){
	for(let i = 0; i < figure.length; i += 1){
		for(let j = 0; j < figure.length; j += 1){
			playField[figure.row + i][figure.column + j] = figureNames[0];
		}
	}

	generateFigure();
}