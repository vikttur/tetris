import { 	PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from '../constants.js';

function generatePlayField() {
	const field = createField();
	createFieldElements(field);
	addPlayFieldInDOM(field);
}

function createField() {
	const field = document.createElement('ul');
	field.classList.add('field');
	return field;
}

function createFieldElements(field) {
	for(let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i += 1) {
		field.append(document.createElement('li'));
	}
}

function addPlayFieldInDOM(field) {
	document.querySelector('.playfield').append(field);
};

export {
	generatePlayField,
}
