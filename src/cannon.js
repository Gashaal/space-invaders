export default class Cannon {
  constructor(ctx, store, ratioX=1, ratioY=1) {
    this.ctx = ctx;
    this.store = store;

    const {width, height} = store.cannon;
    this.width = store.cannon.width = width * ratioX;
    this.height = store.cannon.height = this.width * (height / width);
    this.dx = 7 * ratioX;
    this.shellParams = {
      dy: 5 * ratioY,
      width: 5 * ratioX,
      height: 5 * ratioX,
      color: '#73f440',
    };
    this.sprite = new Image();
    this.sprite.src = 'data:image/png;base64,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';

    this.calcInitialCoords();
  }

  calcInitialCoords() {
    this.store.cannon.x = this.store.ctxWidth / 2 - this.width / 2;
    this.store.cannon.y = this.store.ctxHeight - this.height - this.store.marginBottom;
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
    const {x, y, width, height} = this.store.cannon;
    if (this.store.cannon.isKilled) {
      this.reset();
      this.ctx.drawImage(this.store.boomSprite, x, y, width, height);
    } else {
      this.ctx.drawImage(this.sprite, x, y, width, height);
    }
  }

  drawShells() {
    const {dy, color} = this.shellParams;

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
      this.store.cannon.x += this.dx;
    }
  }

  moveLeft() {
    if (!this.store.cannon.isKilled) {
      this.store.cannon.x -= this.dx;
    }
  }

  fire() {
    const {x, y, width: cannonWidth} = this.store.cannon;
    const {width, height} = this.shellParams;

    this.store.cannon.shells.push({
      x: x + cannonWidth / 2,
      y: y,
      isFly: true,
      width,
      height,
    });
  }
}
