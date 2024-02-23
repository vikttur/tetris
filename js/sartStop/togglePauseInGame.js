import { state } from '../constants/index.js';
import { startLoopTimer, stopLoopTimer } from './loopTimer.js';

function togglePauseInGame() {
	if(!state.isGame) return;
	state.isNotPause = !state.isNotPause;
	state.isNotPause ? startLoopTimer() : stopLoopTimer();
}

export {
  togglePauseInGame,
}
