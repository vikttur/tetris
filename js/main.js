import { FIGURES } from '/js/constants.js';
import { generatePlayField, elementsOfPlayField } from './playField/index.js';
import { generateFigure, drawFigure } from './figure/index.js';
import { startLoopTimer, stopLoopTimer } from './loopTimer/index.js';
import { moveFigureDown, hardDropOfFigure, moveFigureLeft, moveFigureRight } from './moveFigure/index.js';
import { rotateFigure } from './rotateFigure/index.js';

generatePlayField();
const cells = elementsOfPlayField();
 
const figureNames = Object.keys(FIGURES);
let figure = generateFigure(figureNames);
 
let isThereMove = true;
let isNotPause = true;

// drawFigure();

function generateNewFigure() {
  figure = generateFigure(figureNames);
}  

function permissionToMoveFigure(bool) {
	isThereMove = bool;
}

function togglePauseInGame() {
	isNotPause = !isNotPause;
	isNotPause ? startLoopTimer() : stopLoopTimer();
}

document.addEventListener('keydown', onPressKay);

function onPressKay(e) {
	const eKey = e.key.toLowerCase();

	if(eKey === 'escape')	togglePauseInGame();
	if(!isNotPause) return;

	switch(eKey) {
		case 's':
			startLoopTimer();
			break;
		case 'arrowdown':
			moveFigureDown();
			break;
		case ' ':
			hardDropOfFigure();
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
	}

	if (isThereMove) drawFigure(); 
}

export {
	cells,
	figure,
	generateNewFigure,
	permissionToMoveFigure,
}