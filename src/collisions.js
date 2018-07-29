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
      this.store.invaders.list.forEach((invadersRow) => {
        invadersRow.forEach((invader) => {
          if (Collisions.isHit(shell.x, shell.y, invader.x, invader.x + 51, invader.y, invader.y + 34)) {
            shell.isFly = false;
            invader.isAlive = false;
          }
        });
      });
    });
  }

  detectInvadersShells() {
    const {x: cannonX, y: cannonY} = this.store.cannon;

    this.store.invaders.shells.forEach((shell) => {
      if (Collisions.isHit(shell.x, shell.y, cannonX, cannonX + 62, cannonY, cannonY + 32)) {
        shell.isFly = false;
        this.store.cannon.lives -= 1;
      }
    });
  }

  static isHit(x, y, minX, maxX, minY, maxY) {
    return (x >= minX && x <= maxX) && (y >= minY && y <= maxY);
  }
}
