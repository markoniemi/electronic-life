var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
  this.direction = this.randomElement(directionNames);
  this.energy = 10;
}

// TODO randomElement is also implemented in View
BouncingCritter.prototype.randomElement = function(array) {
  return array[Math.floor(Math.random() * array.length)];
};

BouncingCritter.prototype.act = function(view) {
  var plant = view.find("*");
  if (plant){
    return {type: "eat", direction: plant};
  }
  if (view.look(this.direction) !== " ") {
    this.direction = view.find(" ") || "s";
  }
  return {
    type : "move",
    direction : this.direction
  };
};

module.exports = BouncingCritter;