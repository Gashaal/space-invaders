class Invaders {
  constructor(ctx, store, ratioX=1, ratioY=1) {
    this.ctx = ctx;
    this.store = store;

    this.marginX = 20;
    this.marginY = 5;
    this.width = 32;
    this.height = 32;
    this.dx = 20;
    this.dy = 15;
    this.rectMarginX = store.marginLeft * ratioX;
    this.rectMarginY = 100 * ratioY;
    this.moveDirection = 'left';
    this.animateState = false;
    this.timeout = 750;
    this.delay = new Date();
    this.shellsLimit = 2;

    this.spriteBottom = new Image();
    this.spriteBottom.src = 'data:image/png;base64,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';

    this.spriteMiddle = new Image();
    this.spriteMiddle.src = 'data:image/png;base64,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';

    this.spriteTop = new Image();
    this.spriteTop.src = 'data:image/png;base64,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';

    this.canMoved = true;

    this.shellParams = {
      dy: 5 * ratioY,
      width: 5 * ratioX,
      height: 5 * ratioX,
      color: '#73f440',
    };

    this.calcInitRectCoords();
    this.createInvaders();
  }

  calcInitRectCoords() {
    const {rows, columns} = this.store.invaders;

    const invadersRectWidth = columns * this.width + (columns - 1) * this.marginX;
    const invadersRectHeight = rows * this.height + (rows - 1) * this.marginY;

    const minX = (this.store.ctxWidth - invadersRectWidth) / 2;
    const maxX = minX + invadersRectWidth;
    const minY = this.store.marginTop;
    const maxY = minY + invadersRectHeight;

    this.rectCoords = {minX, maxX, minY, maxY};
  }

  createInvaders() {
    const {rows, columns, list} = this.store.invaders;

    for (let i = 0; i < rows; i++) {
      let y = this.rectCoords.minY + (this.height + this.marginY) * i;
      let sprite;
      switch (i) {
        case 0:
        case 1:
          sprite = this.spriteBottom;
          break;
        case 2:
        case 3:
          sprite = this.spriteMiddle;
          break;
        default:
          sprite = this.spriteTop;
          break;
      }

      for (let j = 0; j < columns; j++) {
        let x = this.rectCoords.minX + (this.width + this.marginX) * j;


        list.push({
          x,
          y,
          sprite,
          width: this.width,
          height: this.height,
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
