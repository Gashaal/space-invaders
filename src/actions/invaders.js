export const SET_SIZE = 'SET_MARGIN_SIZE';
export function setSize(ratioX, ratioY) {
  return {
    type: SET_SIZE,
    ratioX,
    ratioY,
  };
}

export const CALC_INITIAL_RECT_COORDS = 'CALC_INITIAL_RECT_COORDS';
export function calcInitRectCoords(rows, columns, width, height, marginX, marginY, canvasWidth, marginTop) {
  return {
    type: CALC_INITIAL_RECT_COORDS,
    rows,
    columns,
    width,
    height,
    marginX,
    marginY,
    canvasWidth,
    marginTop,
  };
}

export const CREATE_INVADERS = 'CREATE_INVADERS';
export function createInvaders(rows, columns, width, height, marginX, marginY) {
  return {
    type: CREATE_INVADERS,
    rows,
    columns,
    width,
    height,
    marginX,
    marginY,
  };
}

export const CALC_COORDS = 'CALC_COORDS';
export function calcCoords(dx, dy) {
  return {
    type: CALC_COORDS,
    dx,
    dy,
  };
}

export const CALC_MOVE = 'CALC_MOVE';
export function calcMove(dx, dy, canvasWidth, canvasHeight) {
  return {
    type: CALC_MOVE,
    dx,
    dy,
    canvasWidth,
    canvasHeight,
  };
}

export const INVADERS_FIRE = 'INVADERS_FIRE';
export function invadersFire(invadersIndexes, shellWidth, shellHeight) {
  return {
    type: INVADERS_FIRE,
    invadersIndexes,
    shellWidth,
    shellHeight,
  };
}

export const INVADERS_SHELL_FLY = 'INVADERS_SHELL_FLY';
export function shellFly(dy) {
  return {
    type: INVADERS_SHELL_FLY,
    dy,
  };
}
