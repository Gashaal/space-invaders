export default class Cannon {
  constructor(ctx, store, ratioX=1, ratioY=1) {
    this.ctx = ctx;
    this.store = store;

    this.calcInitialCoords();
  }

  calcInitialCoords() {
    const { ctxWidth, ctxHeight, marginBottom } = this.store;
    const { width, height } = this.store.cannon;

    this.store.cannon.x = ctxWidth / 2 - width / 2;
    this.store.cannon.y = ctxHeight - height - marginBottom;
  }

  reset() {
    setTimeout(() => {
      this.store.cannon.isAlive = false;
      this.calcInitialCoords();
    }, 500);
  }

  draw() {
    this.drawCannon();
    this.drawShells();
  }

  drawCannon() {
    const { boomSprite } = this.store;
    const {x, y, width, height, isAlive, sprite} = this.store.cannon;

    if (isAlive) {
      this.reset();
      this.ctx.drawImage(boomSprite, x, y, width, height);
    } else {
      this.ctx.drawImage(sprite, x, y, width, height);
    }
  }

  drawShells() {
    const {dy, color} = this.store.cannon.shellParams;

    this.ctx.fillStyle = color;
    this.store.cannon.shells.forEach(({isFly, x, y, width, height}, i) => {
      if (isFly) {
        this.ctx.fillRect(x, y, width, height);
        this.store.cannon.shells[i].y -= dy;
      } else {
        // TODO: придеться часто удалять элемент из середины массива, нехорошо
        // может стоит сделать через хеш таблицу?
        this.store.cannon.shells.splice(i, 1);
      }
    });
  }

  moveRight() {
    const { isAlive, dx } = this.store.cannon;

    if (isAlive) {
      this.store.cannon.x += dx;
    }
  }

  moveLeft() {
    const { isAlive, dx } = this.store.cannon;

    if (isAlive) {
      this.store.cannon.x -= dx;
    }
  }

  fire() {
    const {x, y, width: cannonWidth} = this.store.cannon;
    const {width, height} = this.store.cannon.shellParams;

    this.store.cannon.shells.push({
      x: x + cannonWidth / 2 - width / 2,
      y: y,
      isFly: true,
      width,
      height,
    });
  }
}
