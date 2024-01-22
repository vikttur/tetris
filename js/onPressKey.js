import { moveFigureDown, moveFigureLeft, moveFigureRight } from './main.js';
import { rotateFigureRight, rotateFigureLeft } from './rotateFigure.js';
import { drawFigure } from './figure/drawFigure.js';


export  function onPressKay(e) {
	switch(e.key.toLowerCase()){
		case 'arrowdown':
			moveFigureDown();
			break;
		case 'arrowleft':
			moveFigureLeft();
			break;z
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