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

test('invaders calc coords', () => {
  const dx = 10;
  const dy = 10;
  const invadersList = invaders.store.invaders.list.slice(0);
  invaders.calcCoords(dx, dy);

  invaders.store.invaders.list.forEach((invaderRow, i) => {
    expect(Array.isArray(invaderRow)).toBeTruthy();
    invaderRow.forEach((invader, j) => {
      expect(invader.x).toBe(invadersList[i][j].x + dx);
      expect(invader.y).toBe(invadersList[i][j].y + dy);
    });
  });
});


test.skip('move', () => {
  const {x: initX, y: initY} = invaders.store.invaders.initCoords;
  invaders.store.invaders.dxColumn = 0;
  invaders.store.invaders.dyRow = 0;
  invaders.store.invaders.list = [];
  invaders.calcInitialCoords();

  invaders.move();
  testInvadersCoords(initX + invaders.store.invaders.dx, initY + invaders.store.invaders.dy);
});

test('draw without errors', () => {
  expect(invaders.draw.bind(invaders)).not.toThrow();
});
