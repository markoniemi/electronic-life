import Critter from '../app/Critter';
import World from '../app/World';
import LifelikeWorld from '../app/LifelikeWorld';
import Wall from '../app/Wall';
import Plant from '../app/Plant';
import Vector from '../app/Vector';
import View from '../app/View';

describe('Plant', function() {
  beforeEach(function() {
    // mock randomEnergy for testing
    sinon.stub(Plant.prototype, 'randomEnergy', function() {
      return 1;
    });
  });

  afterEach(function() {
    Plant.prototype.randomEnergy.restore();
  });

  describe('act', function() {
    it('grow', function() {
      this.world = new LifelikeWorld(["*  "], {
        "*": Plant
      });
      let critter = this.world.grid.get(new Vector(0, 0));
      expect(critter.energy).toEqual(1);
      for (var i = 1; i < 14; i += 0.5) {
        this.world.turn();
      }
      testNextTurn(this.world, 0, 0, 14.5);
    });
    it('reproduce', function() {
      this.world = new LifelikeWorld(["*  "], {
        "*": Plant
      });
      var critter = this.world.grid.get(new Vector(0, 0));
      expect(critter.energy).toEqual(1);
      for (var i = 1; i < 14; i += 0.5) {
        this.world.turn();
      }
      testNextTurn(this.world, 0, 0, 14.5);
      testNextTurn(this.world, 0, 0, 15);
      testNextTurn(this.world, 0, 0, 15.5);
      testNextTurn(this.world, 0, 0, 13.5);
      critter = this.world.grid.get(new Vector(1, 0));
      expect(critter.energy).toEqual(1.5);
    });
  });
});

function testNextTurn(world, x, y, energy) {
  world.turn();
  //console.log(world.toString());
  let critter = world.grid.get(new Vector(x, y));
  expect(critter.energy).toEqual(energy);
}
