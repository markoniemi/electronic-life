var Critter = require('../app/Critter');
var BouncingCritter = require('../app/BouncingCritter');
var World = require('../app/World');
var LifelikeWorld = require('../app/LifelikeWorld');
var Wall = require('../app/Wall');
var Plant = require('../app/Plant');
var Vector = require('../app/Vector');
var View = require('../app/View');

// mock randomElement for testing
BouncingCritter.prototype.randomElement = function(array) {
  return "e";
};

describe('BouncingCritter', function() {
  beforeEach(function() {
  });
  describe('act', function() {
    it('move', function() {
      this.world = new LifelikeWorld([ "o  " ], {
        "o" : BouncingCritter
      });
      var critter = this.world.grid.get(new Vector(0, 0));
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
  critter = world.grid.get(new Vector(x, y));
  expect(critter.direction).toEqual(direction);
}
