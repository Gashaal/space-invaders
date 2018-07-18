export default {
  ctxWidth: 480,
  ctxHeight: 320,
  cannon: {
    width: 30,
    height: 30,
    lives: 3,
    dx: 7,
    shellMargin: 2,
    shellWidth: 5,
    shellHeight: 5,
    shells: [],
  },
  invaders: {
    params: {
      rows: 10,
      columns: 10,
      marginX: 20,
      marginY: 5,
      width: 10,
      height: 10,
      dx: 2,
      dy: 15, // height + marginY
      stepX: 8,
      stepY: 8,
    },
    initCoords: {
      y: 35,
    },
    list: [],
  },
};
