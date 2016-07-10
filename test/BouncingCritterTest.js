import _ from 'underscore';
import Critter from '../app/Critter';
import BouncingCritter from '../app/BouncingCritter';
import World from '../app/World';
import LifelikeWorld from '../app/LifelikeWorld';
import Wall from '../app/Wall';
import Plant from '../app/Plant';
import Vector from '../app/Vector';
import View from '../app/View';

describe('BouncingCritter', function() {
  beforeEach(function() {
    // mock _.sample for testing
    sinon.stub(_, 'sample', function(obj, n, guard) {
      return obj[0];
    });
  });

  afterEach(function() {
    _.sample.restore();
  });

  describe('act', function() {
    it('move', function() {
      this.world = new LifelikeWorld([ "o  " ], {
        "o" : BouncingCritter
      });
      let critter = this.world.grid.get(new Vector(0, 0));
      expect(critter.energy).toEqual(10);
      testNextTurn(this.world, 1, 0, "e");
      testNextTurn(this.world, 2, 0, "e");
    });
    it('eat', function() {
      this.world = new LifelikeWorld([ "o  ", "  *" ], {
        "o" : BouncingCritter,
        "*" : Plant
      });
      var critter = this.world.grid.get(new Vector(0, 0));
      expect(critter.energy).toEqual(10);
      testNextTurn(this.world, 1, 0, "e");
      // critter stops to eat
      testNextTurn(this.world, 1, 0, "e");
      testNextTurn(this.world, 2, 0, "e");
    });
  });
});
function testNextTurn(world, x, y, direction) {
  world.turn();
 // console.log(world.toString());
  let critter = world.grid.get(new Vector(x, y));
  expect(critter.direction).toEqual(direction);
}
