import {
  calcInitialCoords,
  moveLeft,
  moveRight,
  fire,
  setSize,
  shellFly,
} from '../src/actions/cannon';

test('setSize', () => {
  const size = setSize(1);
  expect(size).toEqual({type: 'SET_SIZE', ratio: 1});
});

test('calcInitialCoords', () => {
  const calc = calcInitialCoords(800, 600, 50);
  expect(calc).toEqual({
    type: 'CALC_INITIAL_COORDS',
    canvasWidth: 800,
    canvasHeight: 600,
    marginBottom: 50,
  });
});

test('moveLeft', () => {
  const left = moveLeft(7);
  expect(left).toEqual({type: 'MOVE_LEFT', dx: 7});
});

test('moveRight', () => {
  const right = moveRight(7);
  expect(right).toEqual({type: 'MOVE_RIGHT', dx: 7});
});

test('fire', () => {
  const shell = fire(5, 5);
  expect(shell).toEqual({type: 'FIRE', shellWidth: 5, shellHeight: 5});
});

test('shellFly', () => {
  const shell = shellFly(0, 5);
  expect(shell).toEqual({type: 'SHELL_FLY', i: 0, dy: 5});
});

