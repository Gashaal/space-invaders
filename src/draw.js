import drawCannon from './drawCannon';
import store from './store';


document.addEventListener("keydown", keyDownHandler, false);


function keyDownHandler(e) {
    if(e.keyCode == 39) {
      store.cannon.x = store.cannon.x + 7;
    }
    else if(e.keyCode == 37) {
      store.cannon.x = store.cannon.x - 8;
    }
}

export default function draw() {
    store.ctx.clearRect(0, 0, 480, 320);

  drawCannon();

  requestAnimationFrame(draw);
}
