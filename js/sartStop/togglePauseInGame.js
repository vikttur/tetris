import { state } from '../constants/index.js';
import { startLoopTimer, stopLoopTimer } from './loopTimer.js';

function togglePauseInGame() {
	if(!state.isGame) return;
	state.isNotPause = !state.isNotPause;
	if(!state.isNotPause) {
		stopLoopTimer();
		state.backdrop.classList.remove('is-hidden');	
		document.querySelector('.stop-game').innerHTML = 'pause';
		document.querySelector('.pause').classList.add('active');
		return;
	}
	
	state.backdrop.classList.add('is-hidden');
	document.querySelector('.pause').classList.remove('active');	
	startLoopTimer();
}

export {
  togglePauseInGame,
}
