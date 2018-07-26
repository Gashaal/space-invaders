class Invaders {
  constructor(ctx, store) {
    this.ctx = ctx;
    this.store = store;
    this.moveDirection = 'left';
    this.animateState = false;
    this.timeout = 750;
    this.delay = new Date();

    this.calcInitRectCoords();
    this.calcInitialCoords();
  }

  calcLeftCornerCoords() {
    const {columns, width, marginX} = this.store.invaders.params;
    const invadersRectWidth = columns * width + (columns - 1) * marginX;

    this.store.invaders.initCoords.x = (this.store.ctxWidth - invadersRectWidth) / 2;
  }

  calcInitRectCoords() {
    const {rows, columns, width, height, marginX, marginY} = this.store.invaders.params;

    const invadersRectWidth = columns * width + (columns - 1) * marginX;
    const invadersRectHeight = rows * height + (rows - 1) * marginY;

    const minX = (this.store.ctxWidth - invadersRectWidth) / 2;
    const maxX = minX + invadersRectWidth;
    const maxY = this.store.invaders.rectCoords.minY + invadersRectHeight;

    this.store.invaders.rectCoords.maxX = maxX;
    this.store.invaders.rectCoords.minX = minX;
    this.store.invaders.rectCoords.maxY = maxY;
  }

  calcInitialCoords() {
    const {minX: initX, minY: initY} = this.store.invaders.rectCoords;
    const params = this.store.invaders.params;
    let invadersList = this.store.invaders.list;

    for (let i = 0; i < params.rows; i++) {
      invadersList.push([]);
      let y = initY + (params.height + params.marginY) * i;

      for (let j = 0; j < params.columns; j++) {
        let x = initX + (params.width + params.marginX) * j;

        invadersList[i].push({x: x, y: y});
      }
    }
  }

  calcCoords(dx, dy) {
    let xList = [];
    let yList = [];

    this.store.invaders.list.forEach((invadersRow) => {
      invadersRow.forEach((invader) => {
        invader.x += dx;
        invader.y += dy;

        xList.push(invader.x);
        yList.push(invader.y);
      });
    });

    this.store.invaders.rectCoords = {
      minX: Math.min.apply(null, xList),
      maxX: Math.max.apply(null, xList),
      minY: Math.min.apply(null, yList),
      maxY: Math.max.apply(null, yList),
    };
  }

  isInsideCanvasByX() {
    const {rectCoords: {minX, maxX}, rectMarginX, params: {dx, width}} = this.store.invaders;

    if (this.moveDirection === 'left') {
      return (minX - dx) >= rectMarginX;
    } else {
      return (maxX + dx) <= (this.store.ctxWidth - rectMarginX - width);
    }
  }

  isInsideCanvasByY() {
    const {rectCoords: {maxY}, rectMarginY, params: {dy}} = this.store.invaders;
    return ((maxY + dy) <= (this.store.ctxHeight - rectMarginY));
  }

  move() {
    const {dx, dy} = this.store.invaders.params;
    let moveDx, moveDy;

    if (this.isInsideCanvasByX()) {
      moveDy = 0;
      moveDx = this.moveDirection === 'left' ? -dx : dx;
    } else {
      moveDx = 0;

      if (this.isInsideCanvasByY()) {
        moveDy = dy;
        this.moveDirection = this.moveDirection === 'left' ? 'right' : 'left';
      } else {
        // game over
      }
    }

    this.calcCoords(moveDx, moveDy);
  }

  toggleAnimate() {
    if ((new Date - this.delay) > this.timeout) {
      this.delay = new Date();
      this.animateState = !this.animateState;
    }
  }

  getSpriteParams(rowIndex) {
    const {spritesParams} = this.store.invaders;

    let rowSpriteParams;
    switch (rowIndex) {
      case 0:
      case 1:
        rowSpriteParams = spritesParams.bottom;
        break;
      case 2:
      case 3:
        rowSpriteParams = spritesParams.middle;
        break;
      case 4:
        rowSpriteParams = spritesParams.top;
        break;
    }

    this.toggleAnimate();
    return this.animateState ? rowSpriteParams[0] : rowSpriteParams[1];
  }

  draw() {
    const {
      sprite,
      invaders: {
        params: {
          rows,
          columns,
          width: dWidth,
          height: dHeight,
        },
      },
    } = this.store;

    for (let i = 0; i < rows; i++) {
      const {sX, sY, sW, sH} = this.getSpriteParams(i);

      for (let j = 0; j < columns; j++) {
        const {x: dx, y: dy} = this.store.invaders.list[i][j];

        this.ctx.drawImage(sprite, sX, sY, sW, sH, dx, dy, dWidth, dHeight);
      }
    }

    this.move();
  }
}

export default Invaders;
