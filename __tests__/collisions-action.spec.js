import {
  detectCannonDie,
} from '../src/actions/collisions';

test('cannon die', () => {
  const cannonDie = detectCannonDie();
  expect(cannonDie).toEqual({type: 'DETECT_CANNON_DIE'});
});
