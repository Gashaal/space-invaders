export default class Collisions {
  constructor(store) {
    this.store = store;
  }

  detect() {
    this.detectCannonShells();
    this.detectInvadersShells();
  }

  detectCannonShells() {
    this.store.cannon.shells.forEach((shell) => {
      this.store.invaders.list.forEach((invader) => {
        const {x, y, width, height} = invader;

        if (invader.isAlive && Collisions.isHit(shell.x, shell.y, x, x + width, y, y + height)) {
          shell.isFly = false;
          invader.isAlive = false;
        }
      });
    });
  }

  detectInvadersShells() {
    const {x, y, width, height} = this.store.cannon;

    this.store.invaders.shells.forEach((shell) => {
      if (Collisions.isHit(shell.x, shell.y, x, x + width, y, y + height)) {
        shell.isFly = false;
        this.store.cannon.lives -= 1;
        this.store.cannon.isKilled = true;
      }
    });
  }

  static isHit(x, y, minX, maxX, minY, maxY) {
    return (x >= minX && x <= maxX) && (y >= minY && y <= maxY);
  }
}
