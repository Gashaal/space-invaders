import Cannon from './cannon';
import Invaders from './invaders';

class Game {
  constructor(ctx, store) {
    this.ctx = ctx;
    this.store = store;
    this.draw = this.draw.bind(this);

    this.cannon = new Cannon(ctx, store);
    this.invaders = new Invaders(ctx, store);
    document.addEventListener('keydown', this.cannonControls.bind(this), false);
  }

  start() {
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.cannon.draw();
    this.invaders.draw();

    requestAnimationFrame(this.draw);
  }

  cannonControls(e) {
    switch (e.keyCode) {
      case 39:
        this.cannon.moveRight();
        break;
      case 37:
        this.cannon.moveLeft();
        break;
      case 38:
        this.cannon.fire();
    }
  }
}


export default Game;
