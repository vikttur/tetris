import { NEXT_FIELD_COLUMNS, NEXT_FIELD_ROWS, state } from '../constants/index.js';
import { indexOfNextElement } from '../helpers/index.js';

function deleteNextFigure() {
	for(let i = 0; i < NEXT_FIELD_ROWS; i += 1) {
		for(let j = 0; j < NEXT_FIELD_COLUMNS; j += 1) {
			const cellIndex = indexOfNextElement(i, j);	
			state.cellsNext[cellIndex].removeAttribute('class');
		}
	}
};

export {
	deleteNextFigure,
}
