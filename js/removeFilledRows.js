import { PLAYFIELD_COLUMNS } from './constants.js';
import { cells, figure } from './main.js';
import { elementIndex, isValidIndex } from './helpers/index.js';

// s-FilledRows------------------------------------
export function searchForFilledRows() {
	const { size, row } = figure;
	const arrayOfFilledRows = [];

	for(let i = row; i < row + size; i += 1) {
		let quantityOfFilledRows  = 0;

		for(let j = 0; j < PLAYFIELD_COLUMNS; j += 1) {
			const cellIndex = elementIndex(i, j);
			
			if(isValidIndex(cellIndex)) {
				if(cells[cellIndex].hasAttribute('class')) quantityOfFilledRows += 1;
			}
		}

		if(quantityOfFilledRows === PLAYFIELD_COLUMNS) arrayOfFilledRows.push(i);
	}

	return arrayOfFilledRows;
}

export function removingFilledRows(array) {
	for(let n = 0; n < array.length; n += 1) {
		const lastRow = array;

		for(let i = lastRow; i > 0; i -= 1) {
			for(let j = 0; j < PLAYFIELD_COLUMNS; j += 1) {
				const cellIndexUp = elementIndex(i - 1, j); // як бути з першим рядком?
				const cellIndexDown = elementIndex(i, j);

        cells[cellIndexDown].removeAttribute('class');
        if(!cells[cellIndexUp].hasAttribute('class')) continue;
				cells[cellIndexDown].classList = cells[cellIndexUp].classList;
			}
		}
	}
}
// f-FilledRows------------------------------------
