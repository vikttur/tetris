import { FIGURES } from './constants.js';
import { generatePlayField, elementsOfPlayField } from './playField/index.js';
import { generateFigure, drawFigure } from './figure/index.js'
import { onPressKay } from './onPressKey.js'

generatePlayField();
export let figure = {};
export const cells = elementsOfPlayField();
export const figureNames = Object.keys(FIGURES);
figure = generateFigure(figureNames);

drawFigure(cells, figure);

document.addEventListener('keydown', onPressKay);

export function generateNewFigure() {
  figure = generateFigure(figureNames);
}

