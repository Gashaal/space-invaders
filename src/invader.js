export default class Invader {
  constructor(ctx, x, y, width, height, sprite, spriteParams) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
    this.spriteParams = spriteParams;
  }

  draw(spriteIndex) {
    const {sX, sY, sW, sH} = this.spriteParams[i];

    this.ctx.drawImage(this.sprite, sX, sY, sW, sH, dx, dy, dWidth, dHeight);
  }
}