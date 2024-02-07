const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const FIGURES = {
	'O': [
		[1, 1],
		[1, 1],
	],
	'T': [
		[1, 1, 1],
		[0, 1, 0],
		[0, 0, 0],
	],
	'L': [
		[1, 1, 1],
		[1, 0, 0],
		[0, 0, 0],
	],
	'Lr': [	
		[1, 1, 1],
		[0, 0, 1],
		[0, 0, 0],
	],
	'S': [
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0],
	],
	'Sr': [
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0],
	],
	'I': [
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
};

const POINTS_FOR_LINES = {
  '1': 100,
  '2': 300,
  '3': 500,
  '4': 800,
};

export {
	PLAYFIELD_COLUMNS,
	PLAYFIELD_ROWS,
	FIGURES,
	POINTS_FOR_LINES,
}
