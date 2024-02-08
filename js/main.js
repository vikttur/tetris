import { FIGURES } from '/js/constants.js';
import { generatePlayField, generateFieldNextFigure, elementsOfPlayField } from './playField/index.js';
import { generateFigure, drawFigure } from './figure/index.js';
import { startLoopTimer, stopLoopTimer } from './loopTimer/index.js';
import { moveFigureDown, hardDropOfFigure, moveFigureLeft, moveFigureRight } from './moveFigure/index.js';
import { rotateFigureLeft, rotateFigureRight } from './rotateFigure/index.js';

generatePlayField();
const cells = elementsOfPlayField('.field li');
generateFieldNextFigure();
const cellsNext = elementsOfPlayField('.field-next li');
 
const figureNames = Object.keys(FIGURES);
let figure = generateFigure();
 
let isThereMove = true;
let isNotPause = true;
let currentScore = 0;

// drawFigure();

function generateNewFigure() {
  figure = generateFigure();
}  

function permissionToMoveFigure(bool) {
	isThereMove = bool;
}

function savePoints(points) {
	currentScore = points;
}

function togglePauseInGame() {
	isNotPause = !isNotPause;
	isNotPause ? startLoopTimer() : stopLoopTimer();
}

const ref = {
	newBtn: document.querySelector("[data-new]"),
	stopBtn: document.querySelector("[data-stop]"),
	pauseBtn: document.querySelector("[data-pause]"),
	restartBtn: document.querySelector("[data-restart]"),
	rotateLeftBtn: document.querySelector("[data-rotate-left]"),
	rotateRightBtn: document.querySelector("[data-rotate-right]"),	
	leftBtn: document.querySelector("[data-left]"),
	rightBtn: document.querySelector("[data-right]"),
	downBtn: document.querySelector("[data-down]"),
	hardDropBtn: document.querySelector("[data-hard-drop]"),
};

ref.newBtn.addEventListener("click", startLoopTimer);
// ref.stopBtn.addEventListener("click", plug);
ref.pauseBtn.addEventListener("click", togglePauseInGame);
// ref.restartBtn.addEventListener("click", plug);
ref.rotateLeftBtn.addEventListener("click", rotateFigureLeft);
ref.rotateRightBtn.addEventListener("click", rotateFigureRight);
ref.leftBtn.addEventListener("click", moveFigureLeft);
ref.rightBtn.addEventListener("click", moveFigureRight);
ref.downBtn.addEventListener("click", moveFigureDown);
ref.hardDropBtn.addEventListener("click", hardDropOfFigure);

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

export {
	figureNames,
	cells,
	cellsNext,
	figure,
	currentScore,
	generateNewFigure,
	permissionToMoveFigure,
	savePoints,
}
