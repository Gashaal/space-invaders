class Cannon {
  constructor(store) {
    this.store = store;
    this.calcCenter();
  }

  calcCenter() {
    const cannon = this.store.cannon;

    this.store.cannon.x = this.store.ctxWidth/2 - cannon.width/2;
    this.store.cannon.y = this.store.ctxHeight - cannon.height - cannon.height/2;
  }
}

export default Cannon;
