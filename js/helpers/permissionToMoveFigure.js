import { state } from '../constants/index.js';

function permissionToMoveFigure(bool) {
	state.isThereMove = bool;
}

export {
  permissionToMoveFigure,
}
