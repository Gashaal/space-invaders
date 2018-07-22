export default class Cannon {
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
    this.drawCannon();
    this.drawShells();
  }

  drawCannon() {
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

  drawShells() {
    const {shells, shellDy, shellW, shellH, shellColor} = this.store.cannon;

    this.ctx.fillStyle = shellColor;
    shells.forEach((shell) => {
      this.ctx.fillRect(shell.x, shell.y, shellW, shellH);
      shell.y -= shellDy;
    });
  }

  moveRight() {
    this.store.cannon.x += this.store.cannon.dx;
  }

  moveLeft() {
    this.store.cannon.x -= this.store.cannon.dx;
  }

  fire() {
    const {x, y, width, shellW} = this.store.cannon;

    this.store.cannon.shells.push({
      x: x + width / 2 - shellW / 2,
      y: y,
    });
  }
}
