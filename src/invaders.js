class Invaders {
  constructor(ctx, store) {
    this.ctx = ctx;
    this.store = store;

    this.calcInitialCoords();
  }

  calcLeftCornerCoords() {
    const {columns, width, marginX} = this.store.invaders.params;
    const invadersRectWidth = columns * width + (columns - 1) * marginX; // 40 * 5 20 * 4

    this.store.invaders.initCoords.x = (this.store.ctxWidth - invadersRectWidth) / 2;
  }

  calcInitialCoords() {
    this.calcLeftCornerCoords();
    const {x: initX, y: initY} = this.store.invaders.initCoords;
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
    this.store.invaders.list.forEach((invadersRow) => {
      invadersRow.forEach((invader) => {
        invader.x += dx;
        invader.y += dy;
      });
    });
  }

  move() {
    const params = this.store.invaders.params;
    const {x: initX, y: initY} = this.store.invaders.initCoords;

    const x = initX + params.dx * params.dxColumn;
    const y = initY + params.dy * params.dyRow;

    this.calcCoords(x, y);
  }

  draw() {
    const ctx = this.ctx;
    const params = this.store.invaders.params;
    let x, y;

    for (let i = 0; i < params.rows; i++) {
      for (let j = 0; j < params.columns; j++) {
        ({x, y} = this.store.invaders.list[i][j]);

        ctx.beginPath();
        ctx.rect(x, y, params.width, params.height);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

export default Invaders;
