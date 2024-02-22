import { state } from '../constants/index.js';
import { generateFigure } from '../figure/index.js';

function initialSetting() {
  initialState();
  counterReset();
}

function initialState() {
  state.figure = generateFigure();
  state.nameNextFigure = '';
  state.isGame = true;
  state.isThereMove = true;
  state.isNotPause = true;
  state.interval = 700;
  state.quantityFigure = 0;
  state.quantityLines = 0;
  state.currentScore = 0;
}

function counterReset() {
  document.querySelector('.score').innerHTML = 0;
  document.querySelector('.level').innerHTML = 1;
  document.querySelector('.figures').innerHTML = 0;
  document.querySelector('.lines').innerHTML = 0;
}

export {
  initialSetting,
}