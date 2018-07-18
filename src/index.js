import store from './store';
import Game from './game';

const game = new Game(document.getElementById('game-canvas').getContext('2d'), store);
game.start();
