module.exports = function(state, action) {
  switch (action.type) {
    case 'TEST1': {
      const {dx, dy, ttt} = action;
      console.log(dx);
      console.log(dy);
    }
    case 'TEST2': {
      const {dx} = action;
      console.log(dx);
      break;
    }
    default:
      return state;
  }
};
