import store from './store';
import Game from './game';

// const canvas = document.getElementById('game-canvas');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
const game = new Game(document.getElementById('game-canvas').getContext('2d'), store);

game.start();
