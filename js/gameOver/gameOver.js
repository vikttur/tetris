import { state } from '../constants/index.js';
import { permissionToMoveFigure } from '../helpers/index.js';
import { stopGame } from '../sartStop/index.js';
import { saveInLocalStorage } from '../localStorage/localStorage.js';

function gameOver() {
	state.backdrop.classList.remove('is-hidden');	
	permissionToMoveFigure(false);
	document.querySelector('.stop-game').innerHTML = 'game over';
	stopGame();
	saveInLocalStorage();
}

export {
  gameOver,
}
