import {
	PLAYFIELD_COLUMNS,
	PLAYFIELD_ROWS,
	NEXT_FIELD_COLUMNS,
	NEXT_FIELD_ROWS,
} from '../constants/index.js';
import { createField, createFieldElements, addFieldInDOM } from './createField.js';

function generatePlayField() {
	const elementsQuantity = PLAYFIELD_COLUMNS * PLAYFIELD_ROWS;
	generateField('.playfield','field', elementsQuantity);
}

function generateFieldNextFigure() {
	const elementsQuantity = NEXT_FIELD_COLUMNS * NEXT_FIELD_ROWS;
	generateField('.control-panel','field-next', elementsQuantity);
}

function generateField(classParent, classOfField, elementsQuantity) {
	const field = createField(classOfField);
	createFieldElements(field, elementsQuantity);
	addFieldInDOM(field, classParent);
}

export {
	generatePlayField,
	generateFieldNextFigure,
}
