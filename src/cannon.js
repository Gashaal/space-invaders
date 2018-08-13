import {createStore} from 'redux';
import imageData from './images/hero.txt';

import {
  setSize,
  calcInitialCoords,
  moveLeft,
  moveRight,
  fire,
  shellFly,
} from './actions/cannon';
import cannonReducer from './reducers/cannon';

export default class Cannon {
  constructor(ctx, store, ratioX=1, ratioY=1) {
    this.ctx = ctx;
    this.store = store;

    this.storeReducer = createStore(cannonReducer);

    this.state = this.storeReducer.getState();
    this.storeReducer.subscribe(() => {
      this.state = this.storeReducer.getState();
    });

    this.storeReducer.dispatch(setSize(ratioX));
    this.storeReducer.dispatch(calcInitialCoords(800, 600, 50));

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
    const {x, y, width, height, isKilled} = this.state;
    if (isKilled) {
      this.reset();
      this.ctx.drawImage(this.store.boomSprite, x, y, width, height);
    } else {
      this.ctx.drawImage(this.sprite, x, y, width, height);
    }
  }

  drawShells() {
    const {dy, color} = this.shellParams;

    this.ctx.fillStyle = color;
    this.state.shells.forEach((shell, i) => {
      if (shell.isFly) {
        this.ctx.fillRect(shell.x, shell.y, shell.width, shell.height);
        this.storeReducer.dispatch(shellFly(i, dy));
      } else {
        //this.store.cannon.shells.splice(i, 1);
      }
    });
  }

  moveLeft() {
    if (!this.state.isKilled) {
      this.storeReducer.dispatch(moveLeft(this.dx));
    }
  }

  moveRight() {
    if (!this.state.isKilled) {
      this.storeReducer.dispatch(moveRight(this.dx));
    }
  }

  fire() {
    this.storeReducer.dispatch(fire(this.shellParams.width, this.shellParams.height));
  }
}
