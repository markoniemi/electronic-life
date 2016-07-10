import Critter from '../app/Critter';
import WallFollower from '../app/WallFollower';
import World from '../app/World';
import LifelikeWorld from '../app/LifelikeWorld';
import Wall from '../app/Wall';
import Plant from '../app/Plant';
import Vector from '../app/Vector';
import View from '../app/View';

describe('WallFollower', function() {
  beforeEach(function() {
  });
  describe('act', function() {
    it('move', function() {
      this.world = new LifelikeWorld([ "#s  #" ], {
        "s" : WallFollower,
        "#" : Wall
      });
      let critter = this.world.grid.get(new Vector(1, 0));
      expect(critter.energy).toEqual(10);
      testNextTurn(this.world, 2, 0, "e");
      testNextTurn(this.world, 3, 0, "e");
      testNextTurn(this.world, 2, 0, "w");
    });
    it('eat', function() {
      this.world = new LifelikeWorld([ "#s  #", "   * " ], {
        "s" : WallFollower,
        "#" : Wall,
        "*" : Plant
      });
      testNextTurn(this.world, 2, 0, "e");
      // critter stops to eat
      testNextTurn(this.world, 2, 0, "e");
      testNextTurn(this.world, 3, 0, "e");
    });
  });
});
function testNextTurn(world, x, y, direction) {
  world.turn();
//  console.log(world.toString());
  let critter = world.grid.get(new Vector(x, y));
  expect(critter.direction).toEqual(direction);
}
