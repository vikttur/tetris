import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, state } from '../constants/index.js';
import { isExitFromFieldToDown, isExitFromFieldToSide, isOverlayingFigures } from '../helpers/index.js';

function isPermissionToRotate() {
  if(!checkingExitToDown()) return; 
  if(!checkingExitToSide()) return; 
	if(isOverlayingFigures(0, 0)) return;

	return true;
}

function checkingExitToDown() {
  const { size, row } = state.figure;

	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) break;

		if (row + i >= PLAYFIELD_ROWS) {
			if(isExitFromFieldToDown(i)) return;
		}
	}

  return true;
}

function checkingExitToSide() {
  const { size, column } = state.figure;

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
