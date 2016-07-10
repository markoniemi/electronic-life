import Critter from './Critter';

function Plant() {
  Critter.call(this, this.randomEnergy());
}
Plant.prototype = Object.create(Critter.prototype);

Plant.prototype.act = function(view) {
  if (this.energy > 15) {
    var space = view.find(" ");
    if (space) {
      return { type : "reproduce", direction : space };
    }
  }
  if (this.energy < 20) {
    return { type : "grow" };
  }
};
Plant.prototype.randomEnergy = function() {
  return 3 + Math.random() * 4;
};

module.exports = Plant;
