import { randomValue } from '../helpers/index.js';
import { rotateMatrix } from './rotateMatrix.js';

function firstRotationOfMatrix(initialMatrix) {
	const n = randomValue(0, 4);

	for(let i = 0; i < n; i += 1) {
		initialMatrix = rotateMatrix(initialMatrix, "right");
	}

	return initialMatrix; 
}

export {
  firstRotationOfMatrix,
}
