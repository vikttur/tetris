import { PLAYFIELD_COLUMNS, state } from '../constants/index.js';
import { elementIndex } from '../helpers/index.js';
import { pointsForFilledLines } from '../calculationOfPoints/index.js';

function removeFilledRows(array) {
	const { cells } = state;

	for(let n = 0; n < array.length; n += 1) {
		const lastRow = array[array.length - 1];

		for(let i = lastRow; i > 0; i -= 1) {
			for(let j = 0; j < PLAYFIELD_COLUMNS; j += 1) {
				const cellIndexUp = elementIndex(i - 1, j);
				const cellIndexDown = elementIndex(i, j);

        cells[cellIndexDown].removeAttribute('class');
        if(!cells[cellIndexUp].hasAttribute('class')) continue;
				cells[cellIndexDown].classList = cells[cellIndexUp].classList;
			}
		}
	}

	pointsForFilledLines(array.length);
}

export {
	removeFilledRows,
}
