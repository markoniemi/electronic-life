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

let lifelikeWorld = new LifelikeWorld([
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

let gridElement = document.querySelector("#grid");
let playButton = document.querySelector("#play");
let fastForwardButton = document.querySelector("#fastForward");
let pauseButton = document.querySelector("#pause");
let stepButton = document.querySelector("#step");
let worldSelect = document.querySelector("#world");

let divGrid = new DivGrid(world);
divGrid.createGrid(gridElement);
let timerId;

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
