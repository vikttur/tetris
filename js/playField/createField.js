function createField(fieldClass) {
	const field = document.createElement('ul');
	field.classList.add(fieldClass);
	return field;
}

function createFieldElements(field, elementsQuantity) {
	for(let i = 0; i < elementsQuantity; i += 1) {
		field.append(document.createElement('li'));
	}
}

function addPlayFieldInDOM(field, parentClass) {
	document.querySelector(parentClass).prepend(field);
};

export {
  createField,
  createFieldElements,
  addPlayFieldInDOM,
}