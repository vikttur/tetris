import { cells, figure } from '/js/main.js';
import { elementIndex } from './elementIndex.js';

function isOverlayingFigures(offsetRow, offsetColumn) {
	const { matrix, size, row, column } = figure;
	
	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) continue;

		for(let j = 0; j < size; j += 1) {
			if(!matrix[i][j]) continue;
			
			const cellIndex = elementIndex(row + i + offsetRow, column + j + offsetColumn);
			if(cells[cellIndex].hasAttribute('data-figure')) continue;
			if(cells[cellIndex].hasAttribute('class')) return true;
		}
	}

	return false;
}

export {
	isOverlayingFigures,
}