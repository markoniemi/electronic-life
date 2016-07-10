import Critter from './Critter';
import _ from 'underscore/underscore';

var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
  Critter.call(this, 10);
  this.direction = _.sample(directionNames);
}

BouncingCritter.prototype = Object.create(Critter.prototype);

BouncingCritter.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 60 && space){
    return {type: "reproduce", direction: space};
  }
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
