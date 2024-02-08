import { NEXT_FIELD_COLUMNS, NEXT_FIELD_ROWS } from '../constants.js';
import { indexOfNextElement } from '../helpers/elementIndex.js';
import { cellsNext} from '../main.js';

function deleteNextFigure() {
	for(let i = 0; i < NEXT_FIELD_ROWS; i += 1) {
		for(let j = 0; j < NEXT_FIELD_COLUMNS; j += 1) {
			const cellIndex = indexOfNextElement(i, j);	
			cellsNext[cellIndex].removeAttribute('class');
		}
	}
};

export {
	deleteNextFigure,
}
