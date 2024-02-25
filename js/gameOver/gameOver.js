import { permissionToMoveFigure } from '../helpers/index.js';
import { stopGame } from '../sartStop/index.js';
import { saveInLocalStorage } from '../localStorage/localStorage.js';

function gameOver() {
	permissionToMoveFigure(false);
	stopGame();
  console.log('GAME OVER!!!');
	const backdrop = document.querySelector('.backdrop');
	backdrop.classList.remove('is-hidden');
	// gameOver.classList.add('is-hidden');
	
	saveInLocalStorage();
}

export {
  gameOver,
}
