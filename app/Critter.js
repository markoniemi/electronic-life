function Critter(energy) {
  this.energy = energy;
}
//PlantEater.prototype = Object.create(Critter.prototype);

Critter.prototype.actionTypes = Object.create(null);

Critter.prototype.actionTypes.grow = function() {
  this.energy += 0.5;
  return true;
};

Critter.prototype.actionTypes.move = function(world, vector, action) {
  var dest = world.checkDestination(action, vector);
  if (dest === null || this.energy <= 1 || world.grid.get(dest) !== null) {
    return false;
  }
  this.energy -= 1;
  world.grid.set(vector, null);
  world.grid.set(dest, this);
  return true;
};

Critter.prototype.actionTypes.eat = function(world, vector, action) {
  var dest = world.checkDestination(action, vector);
  var atDest = dest !== null && world.grid.get(dest);
  if (!atDest || atDest.energy === null) {
    return false;
  }
  this.energy += atDest.energy;
  world.grid.set(dest, null);
  return true;
};

Critter.prototype.actionTypes.reproduce = function(world, vector, action) {
  var baby = world.elementFromChar(world.legend, this.originChar);
  var dest = world.checkDestination(action, vector);
  if (dest === null || this.energy <= 2 * baby.energy || world.grid.get(dest) !== null) {
    return false;
  }
  this.energy -= 2 * baby.energy;
  world.grid.set(dest, baby);
  return true;
};

module.exports = Critter;
