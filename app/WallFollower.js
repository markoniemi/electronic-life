import Critter from './Critter';

// TODO move to Vector
var directionNames = "n ne e se s sw w nw".split(" ");

export default class WallFollower extends Critter {
    constructor() {
        super(10);
        this.direction = "e";
    }

    act(view) {
        var space = view.find(" ");
        if (this.energy > 60 && space) {
            return {type: "reproduce", direction: space};
        }
        var start = this.direction;
        var plant = view.find("*");
        if (plant) {
            return {type: "eat", direction: plant};
        }
        if (view.look(this.dirPlus(this.direction, -3)) !== " ") {
            start = this.direction = this.dirPlus(this.direction, -2);
        }
        while (view.look(this.direction) !== " ") {
            this.direction = this.dirPlus(this.direction, 1);
            if (this.direction === start) {
                break;
            }
        }
        return {type: "move", direction: this.direction};
    };

// TODO move to Vector
// TODO remove direction parameter
    dirPlus(direction, n) {
        var index = directionNames.indexOf(direction);
        return directionNames[(index + n + 8) % 8];
    }
}
