import {
  setSize,
  calcInitialCoords,
  moveLeft,
  moveRight,
  fire,
  shellFly,
} from './actions/cannon';

import imageData from './images/hero.txt';

export default class Cannon {
  constructor(ctx, store, state, ratioX=1, ratioY=1) {
    this.ctx = ctx;
    this.store = store;
    this.state = store.getState();

    this.store.subscribe(() => {
      this.state = this.store.getState();
    });

    this.store.dispatch(setSize(ratioX));
    this.store.dispatch(calcInitialCoords(800, 600, 50));

    this.dx = 7 * ratioX;
    this.shellParams = {
      dy: 5 * ratioY,
      width: 5 * ratioX,
      height: 5 * ratioX,
      color: '#73f440',
    };
    this.sprite = new Image();
    this.sprite.src = imageData;
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
    const {cannonX, cannonY, cannonWidth, cannonHeight, cannonIsKilled} = this.state;
    this.ctx.drawImage(this.sprite, cannonX, cannonY, cannonWidth, cannonHeight);
    // if (isKilled) {
    //   this.reset();
    //   this.ctx.drawImage(this.store.boomSprite, x, y, width, height);
    // } else {
    // }
  }

  drawShells() {
    const {dy, color} = this.shellParams;

    this.ctx.fillStyle = color;
    this.state.cannonShells.forEach((shell, i) => {
      if (shell.isFly) {
        this.ctx.fillRect(shell.x, shell.y, shell.width, shell.height);
        this.store.dispatch(shellFly(i, dy));
      } else {
        //this.store.cannon.shells.splice(i, 1);
      }
    });
  }

  moveLeft() {
    if (!this.state.cannonIsKilled) {
      this.store.dispatch(moveLeft(this.dx));
    }
  }

  moveRight() {
    if (!this.state.cannonIsKilled) {
      this.store.dispatch(moveRight(this.dx));
    }
  }

  fire() {
    this.store.dispatch(fire(this.shellParams.width, this.shellParams.height));
  }
}
