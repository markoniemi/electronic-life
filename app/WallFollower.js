import Critter from './Critter';

// TODO move to Vector
let directionNames = "n ne e se s sw w nw".split(" ");

export default class WallFollower extends Critter {
    constructor() {
        super(10);
        this.direction = "e";
    }

    act(view) {
        let space = view.find(" ");
        if (this.energy > 60 && space) {
            return {type: "reproduce", direction: space};
        }
        let start = this.direction;
        let plant = view.find("*");
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
        let index = directionNames.indexOf(direction);
        return directionNames[(index + n + 8) % 8];
    }
}
