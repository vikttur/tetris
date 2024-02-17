import { state } from '../constants/index.js';

function isExitFromFieldToDown(rowToCheck) {
	const { matrix, size } = state.figure;

	for(let j = 0; j < size; j += 1) {
		if(!matrix[rowToCheck][j]) continue;
		return true;	
	}
}

function isExitFromFieldToSide(columnToCheck) {
	const { matrix, size } = state.figure;

	for(let i = 0; i < size; i += 1) {
		if(!matrix[i][columnToCheck]) continue;
		return true;	
	}
}

export {
	isExitFromFieldToDown,
	isExitFromFieldToSide,
}
