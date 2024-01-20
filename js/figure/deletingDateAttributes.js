
import { elementIndex, isValidIndex } from '../helpers/index.js';

export function deletingDateAttributes(cells, figure) {
	const { size, row, column } = figure;

	for(let i = 0; i < size; i += 1) {
		for(let j = 0; j < size; j += 1) {
			const cellIndex = elementIndex(row + i, column + j);
			if(!isValidIndex(cellIndex)) continue;
			cells[cellIndex].removeAttribute('data-figure');
		}
	}
}
