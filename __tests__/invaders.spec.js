import fixtures from './fixtures';
import Invaders from '../src/invaders';

let invaders;

beforeAll(() => {
  document.body.innerHTML = '<canvas id="game-canvas" width="800" height="600"></canvas>';
  const ctx = document.getElementById('game-canvas').getContext('2d');
  invaders = new Invaders(ctx, fixtures);
});

test('calc invaders init rect coords', () => {
  invaders.calcInitRectCoords();

  expect(invaders.store.invaders.rectCoords.minX).toBe(161.5);
  expect(invaders.store.invaders.rectCoords.maxX).toBe(638.5);
  expect(invaders.store.invaders.rectCoords.minY).toBe(35);
  expect(invaders.store.invaders.rectCoords.maxY).toBe(225);
});

test('invaders initial coords', () => {
  const topLeftInvader = invaders.store.invaders.list[0][0];
  const bottomRightInvader = invaders.store.invaders.list[4][6];

  expect(topLeftInvader.x).toBe(161.5);
  expect(topLeftInvader.y).toBe(35);
  expect(bottomRightInvader.x).toBe(587.5);
  expect(bottomRightInvader.y).toBe(191);
});

test('toogle animate sprite', () => {
  invaders.delay = new Date();

  invaders.toggleAnimate();
  expect(invaders.animateState).toBe(false);

  setTimeout(() => {
    invaders.toggleAnimate();
    expect(invaders.animateState).toBe(true);
  }, invaders.timeout);
});

test('get sprite params', () => {
  invaders.delay = new Date();

  expect(invaders.getSpriteParams(0)).toEqual({sX: 0, sY: 34, sW: 50, sH: 32});
  expect(invaders.getSpriteParams(1)).toEqual({sX: 0, sY: 34, sW: 50, sH: 32});
  expect(invaders.getSpriteParams(2)).toEqual({sX: 0, sY: 170, sW: 50, sH: 34});
  expect(invaders.getSpriteParams(3)).toEqual({sX: 0, sY: 170, sW: 50, sH: 34});
  expect(invaders.getSpriteParams(4)).toEqual({sX: 0, sY: 102, sW: 51, sH: 34});

  setTimeout(() => {
    expect(invaders.getSpriteParams(0)).toEqual({sX: 0, sY: 68, sW: 50, sH: 32});
    expect(invaders.getSpriteParams(1)).toEqual({sX: 0, sY: 68, sW: 50, sH: 32});
    expect(invaders.getSpriteParams(2)).toEqual({sX: 0, sY: 137, sW: 50, sH: 33});
    expect(invaders.getSpriteParams(3)).toEqual({sX: 0, sY: 137, sW: 50, sH: 33});
    expect(invaders.getSpriteParams(4)).toEqual({sX: 0, sY: 0, sW: 51, sH: 34});

    expect(invaders.animateState).toBe(true);
  }, invaders.timeout);
});

test('invaders rect is inside canvas by x', () => {
  const {rectMarginX} = invaders.store.invaders;
  invaders.calcInitRectCoords();

  expect(invaders.isInsideCanvasByX()).toBe(true);

  invaders.moveDirection = 'left';
  invaders.store.invaders.rectCoords.minX = rectMarginX;
  expect(invaders.isInsideCanvasByX()).toBe(false);

  invaders.moveDirection = 'right';
  invaders.store.invaders.rectCoords.maxX = invaders.store.ctxWidth - rectMarginX;
  expect(invaders.isInsideCanvasByX()).toBe(false);
});

test('invaders rect is inside canvas by y', () => {
  const {rectMarginY} = invaders.store.invaders;
  invaders.calcInitRectCoords();

  expect(invaders.isInsideCanvasByY()).toBe(true);

  invaders.store.invaders.rectCoords.maxY = invaders.store.ctxHeight - rectMarginY;
  expect(invaders.isInsideCanvasByY()).toBe(false);
});

test.skip('draw without errors', () => {
  expect(invaders.draw).not.toThrow();
});
