import { figureNames } from '../main.js';
import { randomValue } from './randomValue.js';

function nameFigure() {
	const figureNumber = randomValue(0, figureNames.length);
	return figureNames[figureNumber];
}

export  {
  nameFigure,
}
