import { FIGURES, state } from './constants/index.js';
import { generatePlayField, generateFieldNextFigure, elementsOfField } from './generateField/index.js';
import { generateFigure, drawFigure } from './figure/index.js';
import { startLoopTimer, stopLoopTimer } from './loopTimer/index.js';
import { moveFigureDown, hardDropOfFigure, moveFigureLeft, moveFigureRight } from './moveFigure/index.js';
import { rotateFigureLeft, rotateFigureRight } from './rotateFigure/index.js';

let { isNotPause, isThereMove } = state;

generatePlayField();
generateFieldNextFigure();
state.cells = elementsOfField('.field li');
state.cellsNext = elementsOfField('.field-next li');
state.figureNames = Object.keys(FIGURES);
state.figure = generateFigure();

// const ref = {
// 	newBtn: document.querySelector("[data-new]"),
// 	pauseBtn: document.querySelector("[data-pause]"),
// 	rotateLeftBtn: document.querySelector("[data-rotate-left]"),
// 	rotateRightBtn: document.querySelector("[data-rotate-right]"),	
// 	leftBtn: document.querySelector("[data-left]"),
// 	rightBtn: document.querySelector("[data-right]"),
// 	downBtn: document.querySelector("[data-down]"),
// 	hardDropBtn: document.querySelector("[data-hard-drop]"),
// };

// ref.newBtn.addEventListener("click", startLoopTimer);
// ref.pauseBtn.addEventListener("click", togglePauseInGame);
// ref.rotateLeftBtn.addEventListener("click", rotateFigureLeft);
// ref.rotateRightBtn.addEventListener("click", rotateFigureRight);
// ref.leftBtn.addEventListener("click", moveFigureLeft);
// ref.rightBtn.addEventListener("click", moveFigureRight);
// ref.downBtn.addEventListener("click", moveFigureDown);
// ref.hardDropBtn.addEventListener("click", hardDropOfFigure);

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
			moveFigureDown(true);
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
			rotateFigureRight();
			break;	
		case 'z':
			rotateFigureLeft();
			break;
	}

	if (isThereMove) drawFigure(); 
}
