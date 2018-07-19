class Cannon {
  constructor(ctx, store) {
    this.ctx = ctx;
    this.store = store;

    this.calcInitialCoords();
  }

  calcInitialCoords() {
    const {width, height} = this.store.cannon;

    this.store.cannon.x = this.store.ctxWidth/2 - width/2;
    this.store.cannon.y = this.store.ctxHeight - height - height/2;
  }

  draw() {
    const {
      sprite,
      cannon: {
        sprite: {sX, sY, sW, sH},
        x: dx,
        y: dy,
        width: dWidth,
        height: dHeight,
      },
    } = this.store;

    this.ctx.drawImage(sprite, sX, sY, sW, sH, dx, dy, dWidth, dHeight);
  }

  moveRight() {
    this.store.cannon.x += this.store.cannon.dx;
  }

  moveLeft() {
    this.store.cannon.x -= this.store.cannon.dx;
  }
}


export default Cannon;
