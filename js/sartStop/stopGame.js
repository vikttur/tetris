import { state } from '../constants/index.js';
import { gameOver }  from '../gameOver/index.js';
import { stopLoopTimer } from './loopTimer.js';

function stopGame() {
  if(!state.isGame) return;
  state.isGame = false;
  stopLoopTimer();
  gameOver();
}

export {
  stopGame,
}
