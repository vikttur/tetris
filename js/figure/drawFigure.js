import { state } from '../constants/index.js';
import { elementIndex, isValidIndex } from '../helpers/index.js';

function drawFigure() {
	const { name, matrix, size, row, column } = state.figure;
	const { cells } = state;
	
	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) continue;

		for(let j = 0; j < size; j += 1) {
			if(!matrix[i][j]) continue;
			
			const cellIndex = elementIndex(row + i, column + j);
			if(!isValidIndex(cellIndex)) continue;

			cells[cellIndex].classList.add(name);
			cells[cellIndex].setAttribute('data-figure', 'new');
		}
	}
}

export {
	drawFigure,
}
