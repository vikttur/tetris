import { 	NEXT_FIELD_COLUMNS, NEXT_FIELD_ROWS } from '../constants.js';
import { createField, createFieldElements, addPlayFieldInDOM } from './createField.js';

function generateFieldNextFigure() {
	const field = createField('field-next');
	const elementsQuantity = NEXT_FIELD_COLUMNS * NEXT_FIELD_ROWS;
	createFieldElements(field, elementsQuantity);
	addPlayFieldInDOM(field, '.playfield');
}

export {
	generateFieldNextFigure,
}
