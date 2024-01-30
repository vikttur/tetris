function rotateMatrix(matrixForRotation, direction) {
	const size = matrixForRotation.length;

	const newMatrix = [];	
	newMatrix.length = size;
	let calcRow = 0;
	let	calcColumn = 0;

	for(let j = 0; j < size; j +=1) {	
		newMatrix[j] = [];

		for(let i = 0; i < size; i +=1) {
			calcRow = (direction === 'right') ?  size - i - 1: i;
			calcColumn = (direction === 'right') ? j : size - j - 1;
	
			newMatrix[j][i] = matrixForRotation[calcRow][calcColumn];
		}
	}

	return newMatrix;
}

export {
  rotateMatrix,
}
