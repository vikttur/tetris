import { state } from '../constants/index.js';
import { initialSetting } from './initialSetting.js';
import { startLoopTimer } from './loopTimer.js';

function newGame() {
  state.backdrop.classList.add('is-hidden');
  if(state.isGame) return;
  initialSetting();
  startLoopTimer();
}

export {
  newGame,
}
