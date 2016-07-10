import World from './World';
import View from './View';

export default class LifelikeWorld extends World {
  constructor(map, legend) {
    super(map, legend);
    World.call(this, map, legend);
  }

  letAct(critter, vector) {
    var action = critter.act(new View(this, vector));
    var handled = action && action.type in critter.actionTypes && critter.actionTypes[action.type].call(critter, this, vector, action);
    if (!handled) {
      critter.energy -= 0.2;
      if (critter.energy <= 0) {
        this.grid.set(vector, null);
      }
    }
  }
}
