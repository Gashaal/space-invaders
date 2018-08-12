import {
  SET_SIZE,
  CALC_INITIAL_COORDS,
  MOVE_LEFT,
  MOVE_RIGHT,
  FIRE,
  SHELL_FLY,
} from '../actions/cannon';

const initialState = {
  width: 32,
  height: 32,
  lives: 3,
  shells: [],
  x: 0,
  y: 0,
};

export default function(state=initialState, action) {
  switch (action.type) {
    case SET_SIZE: {
      const width = state.width * action.ratio;
      const height = state.height * action.ratio;
      return Object.assign({}, state, {width, height});
      break;
    }
    case CALC_INITIAL_COORDS: {
      const {width, height} = state;
      const {canvasWidth, canvasHeight, marginBottom} = action;

      const x = canvasWidth / 2 - width / 2;
      const y = canvasHeight - height - marginBottom;

      return Object.assign({}, state, {x, y});
      break;
    }
    case MOVE_LEFT:
      return Object.assign({}, state, {x: state.x - action.dx});
      break;
    case MOVE_RIGHT:
      return Object.assign({}, state, {x: state.x + action.dx});
      break;
    case FIRE: {
      const {x, y, width, shells} = state;
      shells.push({
        x: x + width / 2,
        y,
        isFly: true,
        width: action.shellWidth,
        height: action.shellHeight,
      });
      return Object.assign({}, state, {shells: shells});
      break;
    }
    case SHELL_FLY:
      const {shells} = state;
      shells[action.i].y -= action.dy;
      return Object.assign({}, state, {shells})
    default:
      return state;
  }
}
