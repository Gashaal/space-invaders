import fixtures from './fixtures';
import Cannon from '../src/cannon';

let cannon;

beforeAll(() => {
  document.body.innerHTML = '<canvas id="game-canvas" width="480" height="320"></canvas>';
  const ctx = document.getElementById('game-canvas').getContext('2d');
  cannon = new Cannon(ctx, fixtures);
});

test('store equal fixtures', () => {
  expect(cannon.store).toEqual(fixtures);
});

test('run calc initial coords in constructor', () => {
  expect(cannon.store.cannon.x).toBe(369);
  expect(cannon.store.cannon.y).toBe(552);
});

test('calc cannon center coords', () => {
  cannon.store.cannon.x = 0;
  cannon.store.cannon.y = 0;

  cannon.calcInitialCoords();
  expect(cannon.store.cannon.x).toBe(369);
  expect(cannon.store.cannon.y).toBe(552);
});

test('move right', () => {
  const x = cannon.store.cannon.x;

  cannon.moveRight();
  expect(cannon.store.cannon.x).toBe(x + cannon.store.cannon.dx);
});

test('move left', () => {
  const x = cannon.store.cannon.x;

  cannon.moveLeft();
  expect(cannon.store.cannon.x).toBe(x - cannon.store.cannon.dx);
});

test('fire', () => {
  const {x, y, width, height, shells, shellW} = cannon.store.cannon;

  expect(Array.isArray(shells)).toBe(true);
  cannon.fire();

  expect(shells.length).toBe(1);
  expect(shells[0].x).toBe(x + width / 2 - shellW / 2);
  expect(shells[0].y).toBe(y);
});
