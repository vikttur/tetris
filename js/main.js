import { FIGURES, CLASS_BTN, state } from './constants/index.js';
import { generatePlayField, generateFieldNextFigure, elementsOfField } from './generateField/index.js';
import { drawFigure } from './figure/index.js';
import { newGame, togglePauseInGame, stopGame } from './sartStop/index.js';
import { moveFigureDown, hardDropOfFigure, moveFigureLeft, moveFigureRight } from './moveFigure/index.js';
import { rotateFigureLeft, rotateFigureRight } from './rotateFigure/index.js';

generatePlayField();
generateFieldNextFigure();
state.cells = elementsOfField('.field li');
state.cellsNext = elementsOfField('.field-next li');
state.backdrop = document.querySelector('.backdrop');
state.figureNames = Object.keys(FIGURES);

const gameControl = document.querySelector(".game-control");
gameControl.addEventListener("click", selectBtn);
document.addEventListener('keydown', onPressKay);

function selectBtn (e) {
  if(e.target.nodeName !== "BUTTON") return;
	
	if(e.target.classList[1] === 'stop')	{
		stopGame();
		return;
	}

	if(e.target.classList[1] === 'pause')	togglePauseInGame();
	if(!state.isNotPause) return;

	switch(e.target.classList[1]) {
		case CLASS_BTN[0]:
			!state.isGame && newGame();
			break;
		case CLASS_BTN[1]:
			togglePauseInGame();
			break;
		case CLASS_BTN[2]:
			rotateFigureLeft();
			break;
		case CLASS_BTN[3]:
			rotateFigureRight();
			break;
		case CLASS_BTN[4]:
			moveFigureLeft();
			break;
		case CLASS_BTN[5]:
			moveFigureRight();
			break;
		case CLASS_BTN[6]:
			hardDropOfFigure();
			break;
		case CLASS_BTN[7]:
			moveFigureDown(true);
			break;
	}
}

function onPressKay(e) {
	const eKey = e.key.toLowerCase();

	if(eKey === 'escape')	togglePauseInGame();
	if(!state.isNotPause) return;
	if(eKey === 's' & !state.isGame) newGame();
	if(!state.isGame) return;
	
	switch(eKey) {
		case 'f':
			state.isGame && stopGame();
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

	if (state.isThereMove) drawFigure(); 
}
