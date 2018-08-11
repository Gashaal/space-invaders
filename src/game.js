import Cannon from './cannon';
import Invaders from './invaders';
import Collisions from './collisions';
import Hud from './hud';

class Game {
  constructor(ctx, store, ratioX=1, ratioY=1) {
    this.ctx = ctx;
    this.store = store;
    this.draw = this.draw.bind(this);

    this.cannon = new Cannon(ctx, store, ratioX, ratioY);
    this.invaders = new Invaders(ctx, store, ratioX, ratioY);
    this.hud = new Hud(ctx, store, ratioX, ratioY);
    this.collisions = new Collisions(store);
    document.addEventListener('keydown', this.cannonControls.bind(this), false);
  }

  start() {
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.collisions.detect();
    this.cannon.draw();
    this.invaders.draw();
    this.hud.draw();

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
