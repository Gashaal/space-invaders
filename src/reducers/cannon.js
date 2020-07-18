import {
  SET_SIZE,
  CALC_INITIAL_COORDS,
  MOVE_LEFT,
  MOVE_RIGHT,
  FIRE,
  SHELL_FLY,
} from '../actions/cannon';

const initialState = {
  cannonWidth: 32,
  cannonHeight: 32,
  lives: 3,
  cannonShells: [],
  cannonX: 0,
  cannonY: 0,
  cannonIsKilled: false,
};

function setSize(state, action) {
  let {cannonWidth, cannonHeight} = state;
  const {ratio} = action;

  cannonWidth *= ratio;
  cannonHeight *= ratio;
  return Object.assign({}, state, {cannonWidth, cannonHeight});
}

function calcInitialCoords(state, action) {
  const {cannonWidth, cannonHeight} = state;
  const {canvasWidth, canvasHeight, marginBottom} = action;

  const cannonX = canvasWidth / 2 - cannonWidth / 2;
  const cannonY = canvasHeight - cannonHeight - marginBottom;

  return Object.assign({}, state, {cannonX, cannonY});
}

function moveLeft(state, action) {
  const cannonX = state.cannonX - action.dx;
  return Object.assign({}, state, {cannonX});
}

function moveRight(state, action) {
  const cannonX = state.cannonX + action.dx;
  return Object.assign({}, state, {cannonX});
}

function fire(state, action) {
  const {cannonX, cannonY, cannonWidth, cannonShells} = state;
  const {shellWidth, shellHeight} = action;
  cannonShells.push({
    x: cannonX + cannonWidth / 2,
    y: cannonY,
    isFly: true,
    width: shellWidth,
    height: shellHeight,
  });
  return Object.assign({}, state, {cannonShells});
}

function shellFly(state, action) {
  const {cannonShells} = state;
  const {i, dy} = action;
  cannonShells[i].y -= dy;
  return Object.assign({}, state, {cannonShells});
}

export default function(state=initialState, action) {
  switch (action.type) {
    case SET_SIZE:
      return setSize(state, action);
    case CALC_INITIAL_COORDS:
      return calcInitialCoords(state, action);
    case MOVE_LEFT:
      return moveLeft(state, action);
    case MOVE_RIGHT:
      return moveRight(state, action);
    case FIRE:
      return fire(state, action);
    case SHELL_FLY:
      return shellFly(state, action);
    default:
      return state;
  }
}
