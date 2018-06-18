import fixtures from './fixtures';
import Cannon from '../src/cannon';

let cannon;

beforeAll(() => {
  cannon = new Cannon(fixtures);
});

test('store equal fixtures', () => {
  expect(cannon.store).toEqual(fixtures);
});

test('run calc center in constructor', () => {
  expect(cannon.store.cannon.x).toBe(225);
  expect(cannon.store.cannon.y).toBe(275);
});

test('calc cannon center coords', () => {
  cannon.store.cannon.x = 0;
  cannon.store.cannon.y = 0;

  cannon.calcCenter();
  expect(cannon.store.cannon.x).toBe(225);
  expect(cannon.store.cannon.y).toBe(275);
});
