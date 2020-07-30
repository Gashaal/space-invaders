class Invaders {
  constructor(ctx, store, ratioX=1, ratioY=1) {
    this.ctx = ctx;
    this.store = store;

    this.calcInitRectCoords();
    this.createInvaders();
  }

  calcInitRectCoords() {
    const { ctxWidth, marginTop } = this.store;
    const {rows, columns, width, height, marginX, marginY} = this.store.invaders;

    const invadersRectWidth = columns * width + (columns - 1) * marginX;
    const invadersRectHeight = rows * height + (rows - 1) * marginY;

    const minX = (ctxWidth - invadersRectWidth) / 2;
    const maxX = minX + invadersRectWidth;
    const minY = marginTop;
    const maxY = minY + invadersRectHeight;

    this.store.invaders.rectCoords = {minX, maxX, minY, maxY};
  }

  createInvaders() {
    const {rows, columns, width, height, marginX, marginY, spriteBottom, spriteMiddle, spriteTop} = this.store.invaders;
    const { minX, maxX, minY, maxY } = this.store.invaders.rectCoords;

    for (let i = 0; i < rows; i++) {
      let y = minY + (height + marginY) * i;
      let sprite;
      switch (i) {
        case 0:
        case 1:
          sprite = spriteBottom;
          break;
        case 2:
        case 3:
          sprite = spriteMiddle;
          break;
        default:
          sprite = spriteTop;
          break;
      }

      for (let j = 0; j < columns; j++) {
        let x = minX + (width + marginX) * j;

        this.store.invaders.list.push({
          x,
          y,
          sprite,
          width,
          height,
          isAlive: true,
        });
      }
    }
  }

  calcCoords(dx, dy) {
    let xList = [];
    let yList = [];
    const {list} = this.store.invaders;

    list.forEach((invader, i) => {
      if (invader.isAlive) {
        invader.x += dx;
        invader.y += dy;

        if (this.isCanFire()) {
          this.store.invaders.shells.push({
            x: invader.x + invader.width / 2 - this.shellParams.width / 2,
            y: invader.y + invader.height,
            isFly: true,
            width: this.shellParams.width,
            height: this.shellParams.height,
          });
        }

        xList.push(invader.x);
        yList.push(invader.y);
      }
    });

    list.forEach((invader, i) => {
      if (!invader.isAlive) {
        list.splice(i, 1);
      }
    });

    this.rectCoords = {
      minX: Math.min.apply(null, xList),
      maxX: Math.max.apply(null, xList),
      minY: Math.min.apply(null, yList),
      maxY: Math.max.apply(null, yList),
    };
  }

  isCanFire() {
    return (Math.random() * 100 > 99) && this.store.invaders.shells.length < this.shellsLimit;
  }

  isInsideCanvasByX() {
    if (this.moveDirection === 'left') {
      return (this.rectCoords.minX - this.dx) >= this.rectMarginX;
    } else {
      return (this.rectCoords.maxX + this.dx) <= (this.store.ctxWidth - this.rectMarginX - this.width);
    }
  }

  isInsideCanvasByY() {
    return ((this.rectCoords.maxY + this.dy) <= (this.store.ctxHeight - this.rectMarginY));
  }

  move() {
    if (this.canMoved) {
      this.canMoved = false;

      setTimeout(() => {
        let moveDx;
        let moveDy;

        if (this.isInsideCanvasByX()) {
          moveDy = 0;
          moveDx = this.moveDirection === 'left' ? -this.dx : this.dx;
        } else {
          moveDx = 0;

          if (this.isInsideCanvasByY()) {
            moveDy = this.dy;
            this.moveDirection = this.moveDirection === 'left' ? 'right' : 'left';
          } else {
            this.store.gameOver = true;
          }
        }

        this.calcCoords(moveDx, moveDy);
        this.canMoved = true;
      }, 1000);
    }
  }

  draw() {
    this.drawInvaders();
    this.drawShells();
  }

  drawInvaders() {
    this.store.invaders.list.forEach((invader, i) => {
      const {x, y, isAlive, sprite, width, height} = invader;

      if (isAlive) {
        this.ctx.drawImage(sprite, x, y, width, height);
      } else {
        this.ctx.drawImage(this.store.boomSprite, x, y, width, height);
      }
    });

    this.move();
  }

  drawShells() {
    const {shells} = this.store.invaders;

    this.ctx.fillStyle = this.shellParams.shellColor;
    shells.forEach((shell, i) => {
      if (!shell.isFly || shell.y > this.store.ctxHeight) {
        shells.splice(i, 1);
      } else {
        const {x, y, width, height} = shell;

        this.ctx.fillRect(x, y, width, height);
        shell.y += this.shellParams.dy;
      }
    });
  }
}

export default Invaders;
