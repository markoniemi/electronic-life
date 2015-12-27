var directionNames = "n ne e se s sw w nw".split(" ");

function dirPlus(dir, n) {
  var index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
}

function WallFollower() {
  this.dir = "s";
  this.energy = 10;
}

WallFollower.prototype.act = function(view) {
  var start = this.dir;
  var plant = view.find("*");
  if (plant){
    return {type: "eat", direction: plant};
  }
  if (view.look(dirPlus(this.dir, -3)) !== " ") {
    start = this.dir = dirPlus(this.dir, -2);
  }
  while (view.look(this.dir) !== " ") {
    this.dir = dirPlus(this.dir, 1);
    if (this.dir === start) {
      break;
    }
  }
  return {type: "move", direction: this.dir};
};

module.exports = WallFollower;