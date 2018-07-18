import store from './store';

const drawCannon = () => {
  const ctx = store.ctx;

  ctx.beginPath();
  ctx.rect(store.cannon.x, store.cannon.y, store.cannon.width, store.cannon.height);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
};

export default drawCannon;
