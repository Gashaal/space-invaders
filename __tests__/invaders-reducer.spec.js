import invadersReducer from '../src/reducers/invaders';

test('set margin for invaders imaginary rectangle', () => {
  let state = {rectMarginX: 10, rectMarginY: 15};
  state = invadersReducer(state, {type: 'SET_MARGIN_SIZE', ratioX: 2, ratioY: 2});
  expect(state.rectMarginX).toBe(20);
  expect(state.rectMarginY).toBe(30);
});

test('calc initial coords for invaders imaginary rectangle', () => {
  const state = invadersReducer({}, {
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

  expect(state.minX).toBe(228);
  expect(state.maxX).toBe(572);
  expect(state.minY).toBe(35);
  expect(state.maxY).toBe(215);
});

test('create invaders', () => {
  let state = {minX: 228, minY: 35, marginX: 20, marginY: 5};
  state = invadersReducer(state, {type: 'CREATE_INVADERS', rows: 2, columns: 2, width: 32, height: 32, marginX: 20, marginY: 5});
  expect(Array.isArray(state.invaders)).toBe(true);

  expect(state.invaders.length).toBe(4);
  expect(state.invaders[0].x).toBe(228);
  expect(state.invaders[0].y).toBe(35);
  expect(state.invaders[0].width).toBe(32);
  expect(state.invaders[0].height).toBe(32);
  expect(state.invaders[0].sprite).toBe('bottom');
});

test('calc invaders coords', () => {
  let state = {invaders: [{x: 20, y: 20}]};
  state = invadersReducer(state, {type: 'CALC_COORDS', dx: 5, dy: 5});
  expect(Array.isArray(state.invaders)).toBe(true);
  expect(state.invaders.length).toBe(1);
  expect(state.invaders[0].x).toBe(25);
  expect(state.invaders[0].y).toBe(25);
});


describe('calc invaders move', () => {
  const fixtures = [
    {
      testName: 'invaders move can left',
      state: {
        minX: 60,
        maxX: 120,
        maxY: 200,
        rectMarginX: 30,
        rectMarginY: 30,
        moveDirection: 'left',
        invaders: [{x: 50, y: 50}],
      },
      expected: {x: 45, y: 50, minX: 45, maxX: 45, minY: 50, maxY: 50, moveDirection: 'left'},
    },
    {
      testName: 'invaders move can right',
      state: {
        minX: 60,
        maxX: 120,
        maxY: 200,
        rectMarginX: 30,
        rectMarginY: 30,
        moveDirection: 'right',
        invaders: [{x: 50, y: 50}],
      },
      expected: {x: 55, y: 50, minX: 55, maxX: 55, minY: 50, maxY: 50, moveDirection: 'right'},
    },
    {
      testName: 'invaders reached the left edge',
      state: {
        minX: 31,
        maxX: 120,
        maxY: 200,
        rectMarginX: 30,
        rectMarginY: 30,
        moveDirection: 'left',
        invaders: [{x: 31, y: 50}],
      },
      expected: {x: 31, y: 55, minX: 31, maxX: 31, minY: 55, maxY: 55, moveDirection: 'right'},
    },
    {
      testName: 'invaders reached the right edge',
      state: {
        minX: 60,
        maxX: 739,
        maxY: 200,
        rectMarginX: 30,
        rectMarginY: 30,
        moveDirection: 'right',
        invaders: [{x: 739, y: 50}],
      },
      expected: {x: 739, y: 55, minX: 739, maxX: 739, minY: 55, maxY: 55, moveDirection: 'left'},
    },
  ];

  fixtures.forEach(({testName, state, expected}) => test(`${testName}`, () => {
    state = invadersReducer(state, {
      type: 'CALC_MOVE',
      dx: 5,
      dy: 5,
      canvasWidth: 800,
      canvasHeight: 600,
    });
    expect(state.invaders[0].x).toBe(expected.x);
    expect(state.invaders[0].y).toBe(expected.y);
    expect(state.minX).toBe(expected.minX);
    expect(state.maxX).toBe(expected.maxX);
    expect(state.minY).toBe(expected.minY);
    expect(state.maxY).toBe(expected.maxY);
    expect(state.moveDirection).toBe(expected.moveDirection);
  }));
});

test('invaders fire', () => {
  let state = {
    invaders: [
      {x: 20, y: 20, width: 32, height: 32},
      {x: 30, y: 30, width: 32, height: 32},
    ],
  };
  state = invadersReducer(state, {type: 'INVADERS_FIRE', invadersIndexes: [0, 1], shellWidth: 5, shellHeight: 5});
  expect(Array.isArray(state.shells)).toBe(true);
  expect(state.shells.length).toBe(2);
  expect(state.shells[0].x).toBe(33.5);
  expect(state.shells[0].y).toBe(52);
});

test('shells fly', () => {
  let state = {
    shells: [
      {x: 20, y: 20, width: 32, height: 32},
      {x: 30, y: 30, width: 32, height: 32},
    ],
  };

  state = invadersReducer(state, {type: 'INVADERS_SHELL_FLY', dy: 5});
  expect(Array.isArray(state.shells)).toBe(true);
  expect(state.shells.length).toBe(2);
  expect(state.shells[0].x).toBe(20);
  expect(state.shells[0].y).toBe(25);
});
