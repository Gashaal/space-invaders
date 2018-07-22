const sprite = new Image();
sprite.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAEACAYAAAADRnAGAAACGUlEQVR42u3aSQ7CMBAEQIsn8P+/hiviAAK8zFIt5QbELiTHmfEYE3L9mZE9AAAAqAVwBQ8AAAD6THY5CgAAAKbfbPX3AQAAYBEEAADAuZrC6UUyfMEEAIBiAN8OePXnAQAAsLcmmKFPAQAAgHMbm+gbr3Sdo/LtcAAAANR6GywPAgBAM4D2JXAAABoBzBjA7AmlOx8AAEAzAOcDAADovTc4vQim6wUCABAYQG8QAADd4dPd2fRVYQAAANQG0B4HAABAawDnAwAA6AXgfAAAALpA2uMAAABwPgAAgPoAM9Ci/R4AAAD2dmqcEQIAIC/AiQGuAAYAAECcRS/a/cJXkUf2AAAAoBaA3iAAALrD+gIAAADY9baX/nwAAADNADwFAADo9YK0e5FMX/UFACA5QPSNEAAAAHKtCekmDAAAAADvBljtfgAAAGgMMGOrunvCy2uCAAAACFU6BwAAwF6AGQPa/XsAAADYB+B8AAAAtU+ItD4OAwAAAFVhAACaA0T7B44/BQAAANALwGMQAAAAADYO8If2+P31AgAAQN0SWbhFDwCAZlXgaO1xAAAA1FngnA8AACAeQPSNEAAAAM4CnC64AAAA4GzN4N9NSfgKEAAAAACszO26X8/X6BYAAAD0Anid8KcLAAAAAAAAAJBnwNEvAAAA9Jns1ygAAAAAAAAAAAAAAAAAAABAQ4COCENERERERERERBrnAa1sJuUVr3rsAAAAAElFTkSuQmCC';

export default {
  ctxWidth: 800,
  ctxHeight: 600,
  cannon: {
    width: 62,
    height: 32,
    lives: 3,
    dx: 7,
    shellDy: 5,
    shellW: 5,
    shellH: 5,
    shellColor: '#73f440',
    shells: [],
    sprite: {
      sX: 0,
      sY: 204,
      sW: 62,
      sH: 32,
    },
  },
  invaders: {
    params: {
      rows: 5,
      columns: 7,
      marginX: 20,
      marginY: 5,
      width: 51,
      height: 34,
      dx: 2,
      dy: 15, // height + marginY
      stepX: 8,
      stepY: 8,
    },
    initCoords: {
      y: 35,
    },
    list: [],
    sprite: {
      bottom: [{x: 0, y: 0, w: 51, h: 34}, {x: 0, y: 102, w: 51, h: 34}],
      middle: [{x: 0, y: 137, w: 50, h: 33}, {x: 0, y: 170, w: 50, h: 34}],
      top: [{x: 0, y: 68, w: 50, h: 32}, {x: 0, y: 34, w: 50, h: 32}],
    },
  },
  sprite: sprite,
};
