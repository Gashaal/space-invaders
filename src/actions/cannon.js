export const SET_SIZE = 'SET_SIZE';
export function setSize(ratio) {
  return {
    type: SET_SIZE,
    ratio,
  };
}

export const CALC_INITIAL_COORDS = 'CALC_INITIAL_COORDS';
export function calcInitialCoords(canvasWidth, canvasHeight, marginBottom) {
  return {
    type: CALC_INITIAL_COORDS,
    canvasWidth,
    canvasHeight,
    marginBottom,
  };
}

export const MOVE_LEFT = 'MOVE_LEFT';
export function moveLeft(dx) {
  return {
    type: MOVE_LEFT,
    dx,
  };
}

export const MOVE_RIGHT = 'MOVE_RIGHT';
export function moveRight(dx) {
  return {
    type: MOVE_RIGHT,
    dx,
  };
}

export const FIRE = 'FIRE';
export function fire(shellWidth, shellHeight) {
  return {
    type: FIRE,
    shellWidth,
    shellHeight,
  };
}

export const SHELL_FLY = 'SHELL_FLY';
export function shellFly(i, dy) {
  return {
    type: SHELL_FLY,
    i,
    dy,
  };
}
