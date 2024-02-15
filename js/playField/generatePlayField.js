import { 	PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from '../constants/constants.js';
import { createField, createFieldElements, addPlayFieldInDOM } from './createField.js';

function generatePlayField() {
	const field = createField('field');
	const elementsQuantity = PLAYFIELD_COLUMNS * PLAYFIELD_ROWS;
	createFieldElements(field, elementsQuantity);
	addPlayFieldInDOM(field, '.playfield');
}

export {
	generatePlayField,
}
