import { FIGURES } from '/js/constants.js';
import { generatePlayField, elementsOfPlayField } from './playField/index.js';
import { generateFigure, drawFigure } from './figure/index.js';

import { moveFigureDown, moveFigureLeft, moveFigureRight } from './moveFigure/index.js';
import { rotateFigure } from './rotateFigure/index.js';

generatePlayField();
const cells = elementsOfPlayField();

let isThereMove = true;
const figureNames = Object.keys(FIGURES);
let figure = generateFigure(figureNames);

drawFigure(cells, figure);

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
	}

	if (isThereMove) drawFigure(cells, figure); 
}

export {
	cells,
	figure,
	generateNewFigure,
	permissionToMoveFigure,
	onPressKay,
}