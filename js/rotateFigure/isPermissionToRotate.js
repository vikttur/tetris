import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, state } from '../constants/index.js';
import { isExitFromFieldToDown, isExitFromFieldToSide, isOverlayingFigures } from '../helpers/index.js';

const { size, row, column } = state.figure;

function isPermissionToRotate() {
	// const { size, row, column } = figure;
	
  if(!checkingExitToDown()) return; 
  if(!checkingExitToSide()) return; 
	if(isOverlayingFigures(0, 0)) return;

	return true;
}

function checkingExitToDown() {
  // const { size, row } = figure;

	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) break;

		if (row + i >= PLAYFIELD_ROWS) {
			if(isExitFromFieldToDown(i)) return;
		}
	}

  return true;
}

function checkingExitToSide() {
  // const { size, column } = figure;

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
