import { FIGURES } from '/js/constants.js';
import { generatePlayField, elementsOfPlayField } from './playField/index.js';
import { generateFigure, drawFigure } from './figure/index.js';
import { moveFigureDown, moveFigureLeft, moveFigureRight } from './moveFigure/index.js';
import { rotateFigure } from './rotateFigure/index.js';

generatePlayField();
const cells = elementsOfPlayField();
 
const figureNames = Object.keys(FIGURES);
let figure = generateFigure(figureNames);
 
let isThereMove = true;
let timeoutId = 0;
let reqestId = 0;
let count = 0;

function startLoop() {
	timeoutId = setTimeout(() => (reqestId = requestAnimationFrame(loopStep)), 700);
	
	count++;
	
	if(count === 100) {
		stopLoop(); 
		console.log(555); 
	}
}

function loopStep() {
	moveFigureDown();
	drawFigure();

	stopLoop(); 
	startLoop();
}

function stopLoop() {
	cancelAnimationFrame(reqestId);
	timeoutId = clearTimeout(timeoutId);
}

drawFigure();

// startLoop();

function generateNewFigure() {
  figure = generateFigure(figureNames);
}  

function permissionToMoveFigure(bool) {
	isThereMove = bool;
}

document.addEventListener('keydown', onPressKay);

function onPressKay(e) {
	switch(e.key.toLowerCase()){
		case 'arrowdown':
			moveFigureDown();
			break;
		case 'arrowleft':
			moveFigureLeft();
			break;
		case 'arrowright':
			moveFigureRight();
			break;
		case 'arrowup':
			rotateFigure(cells, figure, 'right');
			break;	
		case 'z':
			rotateFigure(cells, figure, 'left');
			break;
		case 'escape':
			stopLoop();
			break;
	}

	if (isThereMove) drawFigure(); 
}

export {
	cells,
	figure,
	generateNewFigure,
	permissionToMoveFigure,
	onPressKay,
}