var DivGrid = require('./DivGrid');
var World = require('./World');
var LifelikeWorld = require('./LifelikeWorld');
var Wall = require('./Wall');
var Vector = require('./Vector');
var BouncingCritter = require('./BouncingCritter');
var WallFollower = require('./WallFollower');
var Plant = require('./Plant');
var PlantEater = require('./PlantEater');

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

playButton.addEventListener("click", function() {
  window.clearInterval(timerId);
  timerId = window.setInterval(function() {
    divGrid.calculateNextGeneration();
  }, 1000);
});
pauseButton.addEventListener("click", function() {
  window.clearInterval(timerId);
});
fastForwardButton.addEventListener("click", function() {
  window.clearInterval(timerId);
  timerId = window.setInterval(function() {
    divGrid.calculateNextGeneration();
  }, 300);
});
stepButton.addEventListener("click", function() {
  divGrid.calculateNextGeneration();
});

worldSelect.addEventListener("change", function() {
  divGrid.clearGrid();
  if (worldSelect.value === "1") {
    divGrid = new DivGrid(world);
    divGrid.createGrid(gridElement);
  } else {
    divGrid = new DivGrid(lifelikeWorld);
    divGrid.createGrid(gridElement);
  }
});

