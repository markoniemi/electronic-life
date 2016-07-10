import Grid from './Grid';
import BouncingCritter from './BouncingCritter';
import Vector from './Vector';
import View from './View';

export default class World {
  constructor(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function (line, y) {
      for (var x = 0; x < line.length; x++) {
        grid.set(new Vector(x, y), this.elementFromChar(legend, line[x]));
      }
    }, this);
  }

  getWidth() {
    return this.grid.width;
  };

  getHeight() {
    return this.grid.height;
  };


// TODO belongs to DivGrid?
  colorFromElement(element) {
    if (element === null) {
      return "#000000";
    }
    if (element.energy) {
      var colorComponent = 200 - Math.floor(element.energy * 4);
      return this.rgbToHex(colorComponent, colorComponent, colorComponent);
    }
    return "#000000";
  };

  charFromElement(element) {
    if (element === null) {
      return " ";
    } else {
      return element.originChar;
    }
  };

  elementFromChar(legend, ch) {
    if (ch === " ") {
      return null;
    }
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
  };

  toString() {
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

  getColorAt(x, y) {
    return this.colorFromElement(this.grid.get(new Vector(x, y)));
  };

  getCharAt(x, y) {
    return this.charFromElement(this.grid.get(new Vector(x, y)));
  };

  turn() {
    var acted = [];
    this.grid.forEach(function (critter, vector) {
      if (critter.act && acted.indexOf(critter) === -1) {
        acted.push(critter);
        this.letAct(critter, vector);
      }
    }, this);
  };

  letAct(critter, vector) {
    var action = critter.act(new View(this, vector));
    if (action && action.type === "move") {
      var dest = this.checkDestination(action, vector);
      if (dest && this.grid.get(dest) === null) {
        this.grid.set(vector, null);
        this.grid.set(dest, critter);
      }
    }
  };

  checkDestination(action, vector) {
    if (Vector.directions.hasOwnProperty(action.direction)) {
      var dest = vector.plus(Vector.directions[action.direction]);
      if (this.grid.isInside(dest)) {
        return dest;
      }
    }
  }
  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }
}

