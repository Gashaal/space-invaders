import store from './store';
import Game from './game';

// TODO:
// start, pause, end;
// score;
// взрывать пулю, если она не попадает;
// изменение скорости движения захватчиков;

const canvas = document.getElementById('game-canvas');
// const ratioX = window.innerWidth / canvas.width;
// const ratioY = window.innerHeight / canvas.height;

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// store.ctxWidth = canvas.width;
// store.ctxHeight = canvas.height;
// store.marginTop *= ratioY;
// store.marginBottom *= ratioY;
// store.marginLeft *= ratioX;

const ratioX = 1;
const ratioY = 1;

const game = new Game(canvas.getContext('2d'), store, ratioX, ratioY);
game.start();
