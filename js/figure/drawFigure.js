import { elementIndex, isValidIndex } from '../utils.js';

export function drawFigure(cells, figure) {
	const { name, matrix, size, row, column } = figure;

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
