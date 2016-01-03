var PlantEater = require('../app/PlantEater');
var World = require('../app/World');
var LifelikeWorld = require('../app/LifelikeWorld');
var Wall = require('../app/Wall');
var Plant = require('../app/Plant');
var Vector = require('../app/Vector');
var View = require('../app/View');

describe('PlantEater', function() {
  beforeEach(function() {
    // mock randomElement for testing
    sinon.stub(View.prototype, 'randomElement', function(array) {
      return array[0];
    });
    // mock randomEnergy for testing
    sinon.stub(Plant.prototype, 'randomEnergy', function() {
      return 15;
    });
  });

  afterEach(function() {
    View.prototype.randomElement.restore();
    Plant.prototype.randomEnergy.restore();
  });

  describe('act', function() {
    it('move', function() {
      this.world = new LifelikeWorld(["e  "], {
        "e": PlantEater
      });
      var critter = this.world.grid.get(new Vector(0, 0));
      expect(critter.energy).toEqual(20);
      testNextTurn(this.world, 1, 0, 19);
      testNextTurn(this.world, 2, 0, 18);
    });
    it('eat', function() {
      this.world = new LifelikeWorld(["e  ", "  *"], {
        "e": PlantEater,
        "*": Plant
      });
      var critter = this.world.grid.get(new Vector(0, 0));
      expect(critter.energy).toEqual(20);
      testNextTurn(this.world, 1, 0, 19);
      // critter stops to eat
      testNextTurn(this.world, 1, 0, 34.5);
      testNextTurn(this.world, 2, 0, 33.5);
    });
    it('reproduce', function() {
      this.world = new LifelikeWorld(["e**", "***"], {
        "e": PlantEater,
        "*": Plant
      });
      var critter = this.world.grid.get(new Vector(0, 0));
      expect(critter.energy).toEqual(20);
      testNextTurn(this.world, 0, 0, 35);
      // critter stops to eat
      testNextTurn(this.world, 0, 0, 50.5);
      testNextTurn(this.world, 0, 0, 65.8);
      this.world.turn();
      critter = this.world.grid.get(new Vector(0, 0));
      expect(critter.energy < 30).toBe(true);
      var baby = this.world.grid.get(new Vector(1, 0));
      expect(baby.energy).toEqual(35.1);
    });
  });
});

function testNextTurn(world, x, y, energy) {
  world.turn();
  // console.log(world.toString());
  critter = world.grid.get(new Vector(x, y));
  expect(critter.energy).toEqual(energy);
}
