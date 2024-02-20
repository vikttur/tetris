const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
const NEXT_FIELD_COLUMNS = 4;
const NEXT_FIELD_ROWS = 2;

const POINTS_FOR_LINES = {
  '1': 100,
  '2': 300,
  '3': 500,
  '4': 800,
};

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

const CLASS_BTN = ['new-game', 'pause"',  'rotate-left', 'rotate-right', 'left', 'right', 'hard-drop', 'down'];

export {
	PLAYFIELD_COLUMNS,
	PLAYFIELD_ROWS,
	NEXT_FIELD_COLUMNS,
	NEXT_FIELD_ROWS,
	POINTS_FOR_LINES,
	FIGURES,
	CLASS_BTN,
}
