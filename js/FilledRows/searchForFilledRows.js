import { PLAYFIELD_COLUMNS } from '../constants.js';
import { elementIndex, isValidIndex } from '../helpers/index.js';
import { cells, figure } from '../main.js';

function searchForFilledRows() {
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

export {
	searchForFilledRows,
}
