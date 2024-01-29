const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const FIGURES = {
	'O': [
		[1, 1],
		[1, 1],
	],
	'T': [
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0],
	],
	'L': [
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0],
	],
	'Lr': [
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1],
	],
	'S': [
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0],
	],
	'Sr': [
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1],
	],
	'I': [
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	],
};

export {
	PLAYFIELD_COLUMNS,
	PLAYFIELD_ROWS,
	FIGURES,
}
