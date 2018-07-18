import fixtures from './fixtures';
import Invaders from '../src/invaders';

let invaders;

beforeAll(() => {
  document.body.innerHTML = '<canvas id="game-canvas" width="480" height="320"></canvas>';
  const ctx = document.getElementById('game-canvas').getContext('2d');
  invaders = new Invaders(ctx, fixtures);
});

test('invaders has ctx', () => {
  expect(invaders.ctx).toBeDefined();
});

test('invaders has store', () => {
  expect(invaders.store).toEqual(fixtures);
});

test('invaders calc initial left corner coords for invaders rect', () => {
  invaders.calcLeftCornerCoords();
  expect(invaders.store.invaders.initCoords.x).toBe(100);
  expect(invaders.store.invaders.initCoords.y).toBe(35);
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

test('invaders initial coords', () => {
  const {x: initX, y: initY} = invaders.store.invaders.initCoords;
  invaders.calcInitialCoords();
  const params = invaders.store.invaders.params;
  const invadersList = invaders.store.invaders.list;
  invaders.store.invaders.list = [];

  expect(Array.isArray(invadersList)).toBeTruthy();
  expect(invadersList.length).toBe(params.rows);

  for (let i = 0; i <= params.rows.length; i++) {
    let y = initY + (params.height + params.marginY) * i;

    expect(Array.isArray(invadersList[i])).toBeTruthy();
    expect(invadersList[i].length).toBe(params.columns);

    for (let j = 0; j <= params.columns.length; j++) {
      let x = initX + (params.width + params.marginX) * j;

      expect(invadersList[i][j]).toBeDefined();
      expect(invadersList[i][j].x).toBe(x);
      expect(invadersList[i][j].y).toBe(y);
    }
  }

  testInvadersCoords(initX, initY);
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

function testInvadersCoords(curX, curY) {
  const params = invaders.store.invaders.params;
  const invadersList = invaders.store.invaders.list;

  expect(Array.isArray(invadersList)).toBeTruthy();
  expect(invadersList.length).toBe(params.rows);

  for (let i = 0; i <= params.rows.length; i++) {
    let y = initY + (params.height + params.marginY) * i;

    expect(Array.isArray(invadersList[i])).toBeTruthy();
    expect(invadersList[i].length).toBe(params.columns);

    for (let j = 0; j <= params.columns.length; j++) {
      let x = initX + (params.width + params.marginX) * j;

      expect(invadersList[i][j]).toBeDefined();
      expect(invadersList[i][j].x).toBe(x);
      expect(invadersList[i][j].y).toBe(y);
    }
  }
}
