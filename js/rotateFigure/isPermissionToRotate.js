import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from '../constants.js';
import { isExitFromFieldToDown, isExitFromFieldToSide, isOverlayingFigures } from '../helpers/index.js';

function isPermissionToRotate(figure) {
	const { size, row, column } = figure;
	
	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) break;

		if (row + i >= PLAYFIELD_ROWS) {
			if(isExitFromFieldToDown(i)) return;
		}
	}

	for(let j = 0; j < size; j += 1){
		if(column + j < 0 || column + j >= PLAYFIELD_COLUMNS) {
			if(isExitFromFieldToSide(j)) return;
		}
	}

	if(isOverlayingFigures(0, 0)) return;

	return true;
}

export {
  isPermissionToRotate,
}