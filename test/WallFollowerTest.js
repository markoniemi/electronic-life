var WallFollower = require('../app/WallFollower');
var World = require('../app/World');
var LifelikeWorld = require('../app/LifelikeWorld');
var Wall = require('../app/Wall');
var Plant = require('../app/Plant');
var Vector = require('../app/Vector');
var View = require('../app/View');

describe('WallFollower', function() {
  beforeEach(function() {
  });
  describe('act', function() {
    it('move', function() {
      this.world = new LifelikeWorld([ "#s  #" ], {
        "s" : WallFollower,
        "#" : Wall
      });
      var critter = this.world.grid.get(new Vector(1, 0));
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
  critter = world.grid.get(new Vector(x, y));
  expect(critter.direction).toEqual(direction);
}
