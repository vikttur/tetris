import { FIGURES } from '/js/constants.js';
import { generatePlayField, elementsOfPlayField } from './playField/index.js';
import { generateFigure, drawFigure } from './figure/index.js';
import { moveFigureDown, hardDropOfFigure, moveFigureLeft, moveFigureRight } from './moveFigure/index.js';
import { rotateFigure } from './rotateFigure/index.js';

generatePlayField();
const cells = elementsOfPlayField();
 
const figureNames = Object.keys(FIGURES);
let figure = generateFigure(figureNames);
 
let isThereMove = true;
let isNotPause = true;
let timeoutId = 0;
let reqestId;
let count = 0;
// ==============================
function startLoop() {
	timeoutId = setTimeout(() => (reqestId = requestAnimationFrame(loopStep)), 700);
	count++;
	
	if(count === 100) {
		stopLoop(); 
		console.log('stop'); 
	}
}

function loopStep() {
	console.log(timeoutId); 
	moveFigureDown();
	drawFigure();

	stopLoop(); 
	// console.log(timeoutId); 
	startLoop();
	// console.log(timeoutId); 
}

function stopLoop() {
	cancelAnimationFrame(reqestId);
	timeoutId = clearTimeout(timeoutId);
}
// ==============================
// drawFigure();

function generateNewFigure() {
  figure = generateFigure(figureNames);
}  

function permissionToMoveFigure(bool) {
	isThereMove = bool;
}

function togglePauseInGame() {
	isNotPause = !isNotPause;
	isNotPause ? startLoop() : stopLoop();
}

document.addEventListener('keydown', onPressKay);

function onPressKay(e) {
	const eKey = e.key.toLowerCase();

	if(eKey === 'escape')	togglePauseInGame();
	if(!isNotPause) return;

	switch(eKey) {
		case 's':
			startLoop();
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
	onPressKay,
}