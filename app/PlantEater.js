import Critter from './Critter';

function PlantEater() {
  Critter.call(this, 20);
}
PlantEater.prototype = Object.create(Critter.prototype);

PlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 60 && space){
    return {type: "reproduce", direction: space};
  }
  var plant = view.find("*");
  if (plant){
    return {type: "eat", direction: plant};
  }
  if (space){
    return {type: "move", direction: space};
  }
};

module.exports = PlantEater;
