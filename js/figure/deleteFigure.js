import { state } from '../constants/index.js';
import { elementIndex, isValidIndex } from '../helpers/index.js';

function deleteFigure() {
	const { size, row, column } = state.figure;
	const { cells } = state;

	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) continue;

		for(let j = 0; j < size; j += 1) {
			const cellIndex = elementIndex(row + i, column + j);
			if(!isValidIndex(cellIndex)) continue;
			if(!cells[cellIndex].hasAttribute('data-figure')) continue;
			
			cells[cellIndex].removeAttribute('class');
			cells[cellIndex].removeAttribute('data-figure');
		}
	}
}

export {
	deleteFigure,
}
