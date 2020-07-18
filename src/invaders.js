import {
  setSize,
  calcInitRectCoords,
  createInvaders,
  calcMove,
  invadersFire,
  shellFly,
} from './actions/invaders';

import badBottom from './images/bad_bottom.txt';
import badMiddle from './images/bad_middle.txt';
import badTop from './images/bad_top.txt';

class Invaders {
  constructor(ctx, store, ratioX=1, ratioY=1) {
    this.ctx = ctx;
    this.store = store;
    this.state = store.getState();

    this.store.subscribe(() => {
      this.state = this.store.getState();
    });

    this.marginX = 20;
    this.marginY = 5;
    this.width = 32;
    this.height = 32;
    this.dx = 20;
    this.dy = 15;
    
    this.shellsLimit = 2;

    this.spriteBottom = new Image();
    this.spriteBottom.src = badBottom;

    this.spriteMiddle = new Image();
    this.spriteMiddle.src = badMiddle;

    this.spriteTop = new Image();
    this.spriteTop.src = badTop;

    this.canMoved = true;

    this.shellParams = {
      dy: 5 * ratioY,
      width: 5 * ratioX,
      height: 5 * ratioX,
      color: '#73f440',
    };

    this.store.dispatch(setSize(ratioX, ratioY));
    this.store.dispatch(calcInitRectCoords(5, 11, 32, 32, 20, 5, 800, 35));
    this.store.dispatch(createInvaders(5, 11, 32, 32, 20, 5));

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
        this.store.dispatch(calcMove(20, 15, 800, 600));

        const invadersIndexes = [];
        invadersIndexes.push(Math.floor(Math.random()*this.state.invaders.length));
        invadersIndexes.push(Math.floor(Math.random()*this.state.invaders.length));
        this.store.dispatch(invadersFire(invadersIndexes, 5, 5));
        this.canMoved = true;
      }, 1000);
    }
  }

  draw() {
    this.drawInvaders();
    this.drawShells();
  }

  drawInvaders() {
    this.state.invaders.forEach((invader) => {
      const {x, y, isAlive, sprite, width, height} = invader;
      this.ctx.drawImage(this.spriteBottom, x, y, width, height);
    });

    this.move();

    // this.store.invaders.list.forEach((invader, i) => {
    //
    //   if (isAlive) {
    //     this.ctx.drawImage(sprite, x, y, width, height);
    //   } else {
    //     this.ctx.drawImage(this.store.boomSprite, x, y, width, height);
    //   }
    // });
    //
  }

  drawShells() {
    const {shells} = this.state;

    this.ctx.fillStyle = this.shellParams.color;
    shells.forEach((shell, i) => {
      const {x, y, width, height} = shell;

      this.ctx.fillRect(x, y, width, height);

      // if (!shell.isFly || shell.y > this.store.ctxHeight) {
      //   shells.splice(i, 1);
      // } else {
      //   const {x, y, width, height} = shell;
      //
      //   this.ctx.fillRect(x, y, width, height);
      //   shell.y += this.shellParams.dy;
      // }
    });
    this.store.dispatch(shellFly(2));
  }
}

export default Invaders;
