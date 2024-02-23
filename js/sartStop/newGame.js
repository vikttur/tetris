import { state } from '../constants/index.js';
import { initialSetting } from './initialSetting.js';
import { startLoopTimer } from './loopTimer.js';

function newGame() {
  if(state.isGame) return;
  // location.reload();
  initialSetting();
  startLoopTimer();
}

export {
  newGame,
}
