import { state } from '../constants/index.js';
import { elementIndex, isValidIndex } from './elementIndex.js';

function isOverlayingFigures(offsetRow, offsetColumn) {
	const { size, row, column, matrix } = state.figure;
	const { cells } = state;
	
	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) continue;

		for(let j = 0; j < size; j += 1) {
			if(!matrix[i][j]) continue;
			
			const cellIndex = elementIndex(row + i + offsetRow, column + j + offsetColumn);
			if(!isValidIndex(cellIndex)) continue;
			if(cells[cellIndex].hasAttribute('data-figure')) continue;
			if(cells[cellIndex].hasAttribute('class')) return true;
		}
	}

	return false;
}

export {
	isOverlayingFigures,
}
