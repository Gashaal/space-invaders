import fixtures from './fixtures';
import Cannon from '../cannon';

let cannon;

beforeEach(() => {
  document.body.innerHTML = '<canvas id="game-canvas" width="480" height="320"></canvas>';
  const ctx = document.getElementById('game-canvas').getContext('2d');
  cannon = new Cannon(ctx, fixtures);
});

test('calc cannon center coords', () => {
  cannon.store.cannon.x = 0;
  cannon.store.cannon.y = 0;

  cannon.calcInitialCoords();
  expect(cannon.store.cannon.x).toBe(369);
  expect(cannon.store.cannon.y).toBe(533);
});

test('move right', () => {
  const x = cannon.store.cannon.x;

  cannon.moveRight();
  expect(cannon.store.cannon.x).toBe(x + cannon.dx);
});

test('move left', () => {
  const x = cannon.store.cannon.x;

  cannon.moveLeft();
  expect(cannon.store.cannon.x).toBe(x - cannon.dx);
});

test('fire', () => {
  const {x, y, width, shells} = cannon.store.cannon;

  cannon.fire();
  expect(Array.isArray(shells)).toBe(true);
  expect(shells.length).toBe(1);
  expect(shells[0].x).toBe(x + width / 2 - shells[0].width / 2);
  expect(shells[0].y).toBe(y);
});
