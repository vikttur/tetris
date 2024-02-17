import { state } from '../constants/index.js';
import { randomValue } from './randomValue.js';

function nameFigure() {
	const figureNumber = randomValue(0, state.figureNames.length);
	return state.figureNames[figureNumber];
}

export  {
  nameFigure,
}
