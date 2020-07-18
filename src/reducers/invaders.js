import {
  SET_SIZE,
  CALC_INITIAL_RECT_COORDS,
  CALC_COORDS,
  CALC_MOVE,
  CREATE_INVADERS,
  INVADERS_FIRE,
  INVADERS_SHELL_FLY,
} from '../actions/invaders';

const initialState = {
  rectMarginX: 50,
  rectMarginY: 200,
  shells: [],
};

function calcMove(state, action) {
  const {dx, dy, canvasWidth, canvasHeight} = action;
  let {minX, maxX, minY, maxY, rectMarginX, rectMarginY, moveDirection, invaders, gameOver} = state;
  let xList = [];
  let yList = [];
  let newInvaders = [];
  let moveDx = 0;
  let moveDy = 0;
  let newMoveDirection = moveDirection;
  let newGameOver = gameOver;

  const isInsideCanvasByX = () => {
    if (moveDirection === 'left') {
      return minX - dx >= rectMarginX;
    } else {
      return maxX + dx <= canvasWidth - rectMarginX - 32;
    }
  };
  const isInsideCanvasByY = () => {
    return maxY + dy <= canvasHeight - rectMarginY;
  };

  if (isInsideCanvasByX()) {
    moveDx = moveDirection === 'left' ? -dx : dx;
  } else {
    if (isInsideCanvasByY) {
      moveDy = dy;
      newMoveDirection = moveDirection === 'left' ? 'right' : 'left';
    } else {
      newGameOver = true;
    }
  }

  invaders.forEach((invader) => {
    const x = invader.x + moveDx;
    const y = invader.y + moveDy;
    xList.push(x);
    yList.push(y);
    newInvaders.push(Object.assign({}, invader, {x: x, y: y}));
  });

  return Object.assign({}, state, {
    invaders: newInvaders,
    moveDirection: newMoveDirection,
    gameOver: newGameOver,
    minX: Math.min.apply(null, xList),
    maxX: Math.max.apply(null, xList),
    minY: Math.min.apply(null, yList),
    maxY: Math.max.apply(null, yList),
  });
}

function setSize(state, action) {
  const rectMarginX = state.rectMarginX * action.ratioX;
  const rectMarginY = state.rectMarginY * action.ratioY;
  return Object.assign({}, state, {rectMarginX, rectMarginY});
}

function calcInitialRectCoords(state, action) {
  const {rows, columns, width, height, marginX, marginY, canvasWidth, marginTop} = action;
  //
  const invadersRectWidth = columns * width + (columns - 1) * marginX;
  const invadersRectHeight = rows * height + (rows - 1) * marginY;

  const minX = (canvasWidth - invadersRectWidth) / 2;
  const maxX = minX + invadersRectWidth;
  const minY = marginTop;
  const maxY = minY + invadersRectHeight;

  return Object.assign({}, state, {minX, maxX, minY, maxY});
}

function createInvaders(state, action) {
  const {rows, columns, width, height, marginX, marginY} = action;
  const {minY, minX} = state;
  const invaders = [];

  for (let i = 0; i < rows; i++) {
    let y = minY + (height + marginY) * i;
    let sprite;
    switch (i) {
      case 0:
      case 1:
        sprite = 'bottom';
        break;
      case 2:
      case 3:
        sprite = 'middle';
        break;
      default:
        sprite = 'top';
        break;
    }

    for (let j = 0; j < columns; j++) {
      const x = minX + (width + marginX) * j;
      invaders.push({x, y, sprite, width, height, isAlive: true});
    }
  }

  return Object.assign({}, state, {invaders: invaders});
}

function invadersFire(state, action) {
  const {invadersIndexes, shellWidth, shellHeight} = action;
  const {invaders, shells} = state;

  invadersIndexes.forEach((i) => {
    const {x, y, width, height} = invaders[i];
    shells.push({
      x: x + width / 2 - shellWidth / 2,
      y: y + height,
      isFly: true,
      width: shellWidth,
      height: shellHeight,
    });
  });

  return Object.assign({}, state, {shells});
}

function calcCoords(state, action) {
  const {invaders} = state;
  const {dx, dy} = action;

  const newInvaders = invaders.map((invader) => {
    return Object.assign({}, invader, {x: invader.x + dx, y: invader.y + dy});
  });

  return Object.assign({}, state, {invaders: newInvaders});
}

function shellsFly(state, action) {
  const {dy} = action;
  const {shells} = state;
  const newShells = [];

  shells.forEach((shell) => {
    newShells.push(Object.assign({}, shell, {y: shell.y + dy}));
  });

  return Object.assign({}, state, {shells: newShells});
}

export default function(state=initialState, action) {
  switch (action.type) {
    case SET_SIZE: {
      return setSize(state, action);
    }
    case CALC_INITIAL_RECT_COORDS: {
      return calcInitialRectCoords(state, action);
    }
    case CREATE_INVADERS:
      return createInvaders(state, action);
    case CALC_COORDS: {
      return calcCoords(state, action);
    }
    case CALC_MOVE: {
      return calcMove(state, action);
    }
    case INVADERS_FIRE: {
      return invadersFire(state, action);
    }
    case INVADERS_SHELL_FLY: {
      return shellsFly(state, action);
    }
    default:
      return state;
  }
}
