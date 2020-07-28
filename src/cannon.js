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
      this.store.cannon.isKilled = false;
      this.calcInitialCoords();
    }, 500);
  }

  draw() {
    this.drawCannon();
    this.drawShells();
  }

  drawCannon() {
    const { boomSprite, sprite } = this.store;
    const {x, y, width, height, isKilled} = this.store.cannon;

    if (isKilled) {
      this.reset();
      this.ctx.drawImage(boomSprite, x, y, width, height);
    } else {
      this.ctx.drawImage(sprite, x, y, width, height);
    }
  }

  drawShells() {
    const {dy, color} = this.store.cannon.shellParams;

    this.ctx.fillStyle = color;
    this.store.cannon.shells.forEach((shell, i) => {
      if (shell.isFly) {
        this.ctx.fillRect(shell.x, shell.y, shell.width, shell.height);
        shell.y -= dy;
      } else {
        this.store.cannon.shells.splice(i, 1);
      }
    });
  }

  moveRight() {
    if (!this.store.cannon.isKilled) {
      this.store.cannon.x += this.store.cannon.dx;
    }
  }

  moveLeft() {
    if (!this.store.cannon.isKilled) {
      this.store.cannon.x -= this.store.cannon.dx;
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
