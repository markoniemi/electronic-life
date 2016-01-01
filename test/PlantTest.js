var World = require('../app/World');
var LifelikeWorld = require('../app/LifelikeWorld');
var Wall = require('../app/Wall');
var Plant = require('../app/Plant');
var Vector = require('../app/Vector');
var View = require('../app/View');

describe('Plant', function() {
  beforeEach(function() {
    // mock randomEnergy for testing
    sinon.stub(Plant.prototype, 'randomEnergy', function() {
      return 13;
    });
  });
  
  afterEach(function() {
    Plant.prototype.randomEnergy.restore();
  });
  
  describe('act', function() {
    it('grow', function() {
      this.world = new LifelikeWorld([ "*  " ], {
        "*" : Plant
      });
      var critter = this.world.grid.get(new Vector(0, 0));
      expect(critter.energy).toEqual(13);
      testNextTurn(this.world, 0, 0, 13.5);
      testNextTurn(this.world, 0, 0, 14);
    });
//    it('reproduce', function() {
//      this.world = new LifelikeWorld([ "*  " ], {
//        "*" : Plant
//      });
//      var critter = this.world.grid.get(new Vector(0, 0));
//      expect(critter.energy).toEqual(13);
//      testNextTurn(this.world, 0, 0, 13.5);
//      testNextTurn(this.world, 0, 0, 14);
//      testNextTurn(this.world, 0, 0, 14.5);
//      testNextTurn(this.world, 0, 0, 15);
//      testNextTurn(this.world, 0, 0, 15.5);
//      testNextTurn(this.world, 0, 0, 15.5);
//    });
  });
});

function testNextTurn(world, x, y, energy) {
  world.turn();
  console.log(world.toString());
  critter = world.grid.get(new Vector(x, y));
  expect(critter.energy).toEqual(energy);
}
