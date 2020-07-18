import {
  DETECT_CANNON_DIE,
} from '../actions/collisions';

function detectCannonDie(state, action) {
  return state;
}

export default function(state, action) {
  switch (action.type) {
    case DETECT_CANNON_DIE: {
      return detectCannonDie(state, action);
    }
    default:
      return state;
  }
}
