import { cells, figure } from './main.js';
import { rotateFigureRight, rotateFigureLeft } from './moveFigure/rotateFigure.js';
import { moveFigureDown, moveFigureLeft, moveFigureRight } from './moveFigure/moveFigure.js';
import { drawFigure } from './figure/drawFigure.js';
import { isThereMove } from './moveFigure/moveFigure.js';

export  function onPressKay(e) {
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
			rotateFigureRight(cells, figure);
			break;	
		case 'z':
			rotateFigureLeft(cells, figure);
			break;
	}

	if (isThereMove) drawFigure(cells, figure); 
}