import fixtures from '../store';
import Invaders from '../invaders';

// нарисовать захватчиков в нужных местах;
// проверить, что они двигаются - вправа, влево, вниз

let invaders;
let store = { ...fixtures };

beforeAll(() => {
  document.body.innerHTML = '<canvas id="game-canvas" width="800" height="600"></canvas>';
  const ctx = document.getElementById('game-canvas').getContext('2d');
  invaders = new Invaders(ctx, store);
});

test('calc invaders init rect coords', () => {
  const { minX, maxX, minY, maxY } = store.invaders.rectCoords;

  expect(minX).toBe(124);
  expect(maxX).toBe(676);
  expect(minY).toBe(35);
  expect(maxY).toBe(215);
});

test("count of invaders", () => {
  const {columns, rows, list} = store.invaders;
  expect(list.length).toBe(columns * rows);
});

test('invaders initial coords', () => {
  const topLeftInvader = list[0];
  const bottomRightInvader = list[54];

  expect(topLeftInvader.x).toBe(124);
  expect(topLeftInvader.y).toBe(35);
  expect(bottomRightInvader.x).toBe(644);
  expect(bottomRightInvader.y).toBe(183);
});

test.skip('toogle animate sprite', () => {
  invaders.delay = new Date();

  invaders.toggleAnimate();
  expect(invaders.animateState).toBe(false);

  setTimeout(() => {
    invaders.toggleAnimate();
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
