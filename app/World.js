import Grid from './Grid';
import BouncingCritter from './BouncingCritter';
import Vector from './Vector';
import View from './View';

function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function(line, y) {
    for (var x = 0; x < line.length; x++) {
      grid.set(new Vector(x, y), this.elementFromChar(legend, line[x]));
    }
  }, this);
}
World.prototype.getWidth = function() {
  return this.grid.width;
};
World.prototype.getHeight = function() {
  return this.grid.height;
};

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
// TODO belongs to DivGrid?
World.prototype.colorFromElement = function(element) {
  if (element === null) {
    return "#000000";
  }
  if (element.energy) {
    var colorComponent = 200 - Math.floor(element.energy * 4);
    return rgbToHex(colorComponent, colorComponent, colorComponent);
  }
  return "#000000";
};

World.prototype.charFromElement = function(element) {
  if (element === null) {
    return " ";
  } else {
    return element.originChar;
  }
};

World.prototype.elementFromChar = function(legend, ch) {
  if (ch === " ") {
    return null;
  }
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
};

World.prototype.toString = function() {
  var output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x, y));
      output += this.charFromElement(element);
    }
    output += "\n";
  }
  return output;
};

World.prototype.getColorAt = function(x, y) {
  return this.colorFromElement(this.grid.get(new Vector(x, y)));
};

World.prototype.getCharAt = function(x, y) {
  return this.charFromElement(this.grid.get(new Vector(x, y)));
};

World.prototype.turn = function() {
  var acted = [];
  this.grid.forEach(function(critter, vector) {
    if (critter.act && acted.indexOf(critter) === -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};

World.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  if (action && action.type === "move") {
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) === null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};

World.prototype.checkDestination = function(action, vector) {
  if (Vector.directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(Vector.directions[action.direction]);
    if (this.grid.isInside(dest)) {
      return dest;
    }
  }
};

module.exports = World;
