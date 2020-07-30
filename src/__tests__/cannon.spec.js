import fixtures from '../store';
import Cannon from '../cannon';

// Что я хочу проверить?
// пушка находиться посередине экрана
// пушка двигается  - если не убита
// пушка стреляет - если не убита

let cannon;
let store = { ...fixtures };

beforeEach(() => {
  document.body.innerHTML = '<canvas id="game-canvas" width="480" height="320"></canvas>';
  const ctx = document.getElementById('game-canvas').getContext('2d');
  cannon = new Cannon(ctx, store);
});


test('calc cannon center coords', () => {
  expect(store.cannon.x).toBe(384);
  expect(store.cannon.y).toBe(518);
});

test('move right', () => {
  const { x, dx } = store.cannon;

  cannon.moveRight();
  expect(store.cannon.x).toBe(x + dx);
});

test('move left', () => {
  const { x, dx } = store.cannon;

  cannon.moveLeft();
  expect(store.cannon.x).toBe(x - dx);
});

test('fire', () => {
  const {x, y, width, shells} = store.cannon;

  cannon.fire();
  expect(Array.isArray(shells)).toBe(true);
  expect(shells.length).toBe(1);
  expect(shells[0].x).toBe(x + width / 2 - shells[0].width / 2);
  expect(shells[0].y).toBe(y);
});
