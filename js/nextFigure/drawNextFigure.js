
import { indexOfNextElement } from '../helpers/index.js';
import { cellsNext} from '../main.js';
import { deleteNextFigure } from './deleteNextFigure.js';

function drawNextFigure(nextFigure) {
	deleteNextFigure();

	const { name, matrix, size } = nextFigure;

	for(let i = 0; i < size; i += 1) {
		for(let j = 0; j < size; j += 1) {
			if(!matrix[i][j]) continue;
			
			const cellIndex = indexOfNextElement(i, j);
			cellsNext[cellIndex].classList.add(name);
		}
	}
}

export {
	drawNextFigure,
}
