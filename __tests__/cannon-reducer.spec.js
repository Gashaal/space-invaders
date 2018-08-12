import cannonReducer from '../src/reducers/cannon';

test('set cannon width and height', () => {
  let state = {width: 32, height: 32};
  state = cannonReducer(state, {type: 'SET_SIZE', ratio: 1});
  expect(state.width).toBe(32);
  expect(state.height).toBe(32);
});

test('calc initial x, y for cannon', () => {
  let state = {width: 32, height: 32, y: 0, x: 0};
  state = cannonReducer(state, {
    type: 'CALC_INITIAL_COORDS',
    canvasWidth: 800,
    canvasHeight: 600,
    marginBottom: 50});
  expect(state.x).toBe(384);
  expect(state.y).toBe(518);
});

test('move left', () => {
  let state = {x: 10};
  state = cannonReducer(state, {type: 'MOVE_LEFT', dx: 5});
  expect(state.x).toBe(5);
});

test('move right', () => {
  let state = {x: 10};
  state = cannonReducer(state, {type: 'MOVE_RIGHT', dx: 5});
  expect(state.x).toBe(15);
});

test('fire', () => {
  let state = {width: 32, x: 20, y: 20, shells: []};
  state = cannonReducer(state, {type: 'FIRE', shellWidth: 6, shellHeight: 6});
  expect(state.shells.length).toBe(1);
  expect(state.shells[0]).toEqual({x: 36, y: 20, isFly: true, width: 6, height: 6});
});

test('shell fly', () => {
  let state = {shells: [{y: 10}]};
  state = cannonReducer(state, {type: 'SHELL_FLY', i: 0, dy: 5});
  expect(state.shells[0].y).toBe(5);
});