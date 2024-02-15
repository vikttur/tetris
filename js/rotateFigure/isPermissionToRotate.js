import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from '../constants/constants.js';
import { isExitFromFieldToDown, isExitFromFieldToSide, isOverlayingFigures } from '../helpers/index.js';

function isPermissionToRotate(figure) {
	const { size, row, column } = figure;
	
  if(!checkingExitToDown(figure)) return; 
  if(!checkingExitToSide(figure)) return; 
	if(isOverlayingFigures(0, 0)) return;

	return true;
}

function checkingExitToDown(figure) {
  const { size, row } = figure;

	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) break;

		if (row + i >= PLAYFIELD_ROWS) {
			if(isExitFromFieldToDown(i)) return;
		}
	}

  return true;
}

function checkingExitToSide(figure) {
  const { size, column } = figure;

	for(let j = 0; j < size; j += 1){
		if(column + j < 0 || column + j >= PLAYFIELD_COLUMNS) {
			if(isExitFromFieldToSide(j)) return;
		}
	}

  return true;
}

export {
  isPermissionToRotate,
}
