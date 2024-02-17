import { PLAYFIELD_COLUMNS, state } from '../constants/index.js';
import { elementIndex, isValidIndex } from '../helpers/index.js';

function searchForFilledRows() {
	const { size, row } = state.figure;
	const { cells } = state;
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
