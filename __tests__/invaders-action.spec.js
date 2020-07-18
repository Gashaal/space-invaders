import {
  setSize,
  calcInitRectCoords,
  createInvaders,
  calcCoords,
  calcMove,
  invadersFire,
  shellFly,
} from '../src/actions/invaders.js';

test('setSize', () => {
  const size = setSize(1, 1);
  expect(size).toEqual({type: 'SET_MARGIN_SIZE', ratioX: 1, ratioY: 1});
});

test('calcInitRectCoords', () => {
  const initRectCoords = calcInitRectCoords(5, 7, 32, 32, 20, 5, 800, 35);
  expect(initRectCoords).toEqual({
    type: 'CALC_INITIAL_RECT_COORDS',
    rows: 5,
    columns: 7,
    width: 32,
    height: 32,
    marginX: 20,
    marginY: 5,
    canvasWidth: 800,
    marginTop: 35,
  });
});

test('createInvaders', () => {
  const invaders = createInvaders(2, 2, 32, 32, 20, 5);
  expect(invaders).toEqual({
    type: 'CREATE_INVADERS',
    rows: 2,
    columns: 2,
    width: 32,
    height: 32,
    marginX: 20,
    marginY: 5,
  });
});

test('calcCoords', () => {
  const coords = calcCoords(5, 5);
  expect(coords).toEqual({type: 'CALC_COORDS', dx: 5, dy: 5});
});

test('calc move', () => {
  const move = calcMove(5, 5, 800, 600);
  expect(move).toEqual({
    type: 'CALC_MOVE',
    dx: 5,
    dy: 5,
    canvasWidth: 800,
    canvasHeight: 600,
  });
});

test('invaders fire', () => {
  const fire = invadersFire([0, 1], 5, 5);
  expect(fire).toEqual({
    type: 'INVADERS_FIRE',
    invadersIndexes: [0, 1],
    shellWidth: 5,
    shellHeight: 5,
  });
});

test('shells fly', () => {
  const shells = shellFly(5);
  expect(shells).toEqual({type: 'INVADERS_SHELL_FLY', dy: 5});
})


