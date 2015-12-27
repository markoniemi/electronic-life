function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
  this.direction = randomElement(directionNames);
  this.energy = 10;
}

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