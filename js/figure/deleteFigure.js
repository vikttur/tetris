import { elementIndex, isValidIndex } from '../helpers/index.js';

export function deleteFigure(cells, figure) {
	const { matrix, size, row, column } = figure;

	for(let i = 0; i < size; i += 1) {
		if(i + row < 0) continue;

		for(let j = 0; j < size; j += 1) {
			if(!matrix[i][j]) continue;
			const cellIndex = elementIndex(row + i, column + j);
			if(!isValidIndex(cellIndex)) continue;
			cells[cellIndex].removeAttribute('class');
			cells[cellIndex].removeAttribute('data-figure');
		}
	}
}
