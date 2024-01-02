const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = [
	'O'
];

const TETROMINOES = {
	'O': [
		[1, 1],
		[1, 1],
	],
};

let playField;
let tetromino;

function convertPositionToIndex() {
	return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayField () {
	for(let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
		const dim = document.createElement('div');
		document.querySelector('.tetris').append(div);
	}

	playField = newArray(PLAYFIELD_ROWS)
		.fill(0)
		.map( () => new Array(PLAYFIELD_COLUMNS).fill(0));
	console.log(playField);
}

function generateTetromino(){
	const nameTetro = '0';
	const matrixTetro = TETROMINOES[name];

	const columnTetro = 5;
	const rowTetro = 3;

	tetromino = {
		name: nameTetro,
		matrix: matrixTetro,
		row: rowTetro,
		column: columnTetro,
	}
}

generatePlayField();
generateTetromino();
const cells = document.querySelector('.tetris div');

function drawTetromino(){
	const name = tetromino.name;
	const tetrominoMatrixSize = tetromino.matrix.length;

	for(let row = 0; tetrominoMatrixSize; row++){
		for(let column = 0; tetrominoMatrixSize; column++){
			const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
			cells[cellIndex.index].classList.add(name);
		}
	}
}

drawTetromino();

function draw(){
	cells.forEach(function(cell){cell.removeAttribute('class')});

	drawTetromino();
}

document.addEventListener('keydown', onKeyDown);

function onKeyDown(e) {
	switch(e.key){
		case 'ArrowDown':
			moveTetrominoDown();
			break;
		case 'ArrowLeft':
				moveTetrominoLeft();
				break;
		case 'ArrowRight':
			moveTetrominoRight();
			break;
	}

	draw();
}

function moveTetrominoDown(){
	tetromino.row += 1;
}

function moveTetrominoLeft(){
	tetromino.column -= 1;
}

function moveTetrominoRight(){
	tetromino.column += 1;
}