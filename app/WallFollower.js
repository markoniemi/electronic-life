// TODO move to View
var directionNames = "n ne e se s sw w nw".split(" ");

function WallFollower() {
  this.direction = "e";
  this.energy = 10;
}

WallFollower.prototype.act = function(view) {
  var start = this.direction;
  var plant = view.find("*");
  if (plant){
    return {type: "eat", direction: plant};
  }
  if (view.look(this.dirPlus(this.direction, -3)) !== " ") {
    start = this.direction = this.dirPlus(this.direction, -2);
  }
  while (view.look(this.direction) !== " ") {
    this.direction = this.dirPlus(this.direction, 1);
    if (this.direction === start) {
      break;
    }
  }
  return {type: "move", direction: this.direction};
};

// TODO remove direction parameter
WallFollower.prototype.dirPlus = function(direction, n) {
  var index = directionNames.indexOf(direction);
  return directionNames[(index + n + 8) % 8];
};

module.exports = WallFollower;