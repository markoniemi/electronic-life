import DivGrid from './DivGrid';
import World from './World';
import LifelikeWorld from './LifelikeWorld';
import Wall from './Wall';
import Vector from './Vector';
import BouncingCritter from './BouncingCritter';
import WallFollower from './WallFollower';
import Plant from './Plant';
import PlantEater from './PlantEater';

var world = new World([
    "############################",
    "#      #    #      o     s##",
    "#                          #",
    "#s         #####           #",
    "##         #   #    ##     #",
    "###           ##     #     #",
    "#    s      ###      #     #",
    "#   ####                   #",
    "#   ##       o             #",
    "# o  #         o       ### #",
    "#    #                     #",
    "############################"], 
    {"#": Wall,
     "o": BouncingCritter,
     "s": WallFollower});

var lifelikeWorld = new LifelikeWorld([ 
    "############################",
    "#####                 ######", 
    "##   ***                **##",
    "#   *##**         **  o  *##", 
    "#    ***     s    ##**    *#",
    "#       e         ##***    #", 
    "#                 ##**     #",
    "#   e       #*             #", 
    "#*          #**       e    #",
    "#***        ##**    e    **#", 
    "##****     ###***       *###",
    "############################" ], {
  "#" : Wall,
  "e" : PlantEater,
  "o": BouncingCritter,
  "s": WallFollower,
  "*" : Plant
});

var gridElement = document.querySelector("#grid");
var playButton = document.querySelector("#play");
var fastForwardButton = document.querySelector("#fastForward");
var pauseButton = document.querySelector("#pause");
var stepButton = document.querySelector("#step");
var worldSelect = document.querySelector("#world");

var divGrid = new DivGrid(world);
divGrid.createGrid(gridElement);
var timerId;

playButton.addEventListener("click", () => {
  window.clearInterval(timerId);
  timerId = window.setInterval(() => {
    divGrid.calculateNextGeneration();
  }, 1000);
});
pauseButton.addEventListener("click", () => {
  window.clearInterval(timerId);
});
fastForwardButton.addEventListener("click", () => {
  window.clearInterval(timerId);
  timerId = window.setInterval(() => {
    divGrid.calculateNextGeneration();
  }, 300);
});
stepButton.addEventListener("click", () => {
    window.clearInterval(timerId);
  divGrid.calculateNextGeneration();
});


worldSelect.addEventListener("change", () => {
  divGrid.clearGrid();
  if (worldSelect.value === "1") {
    divGrid = new DivGrid(world);
    divGrid.createGrid(gridElement);
  } else {
    divGrid = new DivGrid(lifelikeWorld);
    divGrid.createGrid(gridElement);
  }
});
