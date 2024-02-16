import {
	PLAYFIELD_COLUMNS,
	PLAYFIELD_ROWS,
	NEXT_FIELD_COLUMNS,
	NEXT_FIELD_ROWS,
} from '../constants/index.js';
import { createField, createFieldElements, addFieldInDOM } from './createField.js';

function generatePlayField() {
	const elementsQuantity = PLAYFIELD_COLUMNS * PLAYFIELD_ROWS;
	generateField('field', elementsQuantity);
}

function generateFieldNextFigure() {
	const elementsQuantity = NEXT_FIELD_COLUMNS * NEXT_FIELD_ROWS;
	generateField('field-next', elementsQuantity);
}

function generateField(classOfField, elementsQuantity) {
	const field = createField(classOfField);
	createFieldElements(field, elementsQuantity);
	addFieldInDOM(field, '.playfield');
}

export {
	generatePlayField,
	generateFieldNextFigure,
}
