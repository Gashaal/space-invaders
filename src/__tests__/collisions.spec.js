import fixtures from './fixtures-collisions';
import Collisions from '../collisions';

let collisions;

beforeAll(() => {
  collisions = new Collisions(fixtures);
});

test('point in rect', () => {
  expect(Collisions.isHit(5, 5, 10, 20, 10, 20)).toBe(false);
  expect(Collisions.isHit(15, 15, 10, 20, 10, 20)).toBe(true);
});

test('detect cannon shells', () => {
  collisions.detectCannonShells();

  expect(collisions.store.cannon.shells[0].isFly).toBe(false);
  expect(collisions.store.invaders.list[0].isAlive).toBe(false);
});

test('detect invaders shells', () => {
  const cannonLives = collisions.store.cannon.lives;

  collisions.detectInvadersShells();

  expect(collisions.store.invaders.shells[0].isFly).toBe(false);
  expect(collisions.store.cannon.lives).toBe(cannonLives - 1);
});
