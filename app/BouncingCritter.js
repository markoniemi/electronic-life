import Critter from './Critter';
import _ from 'underscore/underscore';

let directionNames = "n ne e se s sw w nw".split(" ");

export default class BouncingCritter extends Critter {
    constructor() {
        super(10);
        this.direction = _.sample(directionNames);
    }

    act(view) {
        let space = view.find(" ");
        if (this.energy > 60 && space) {
            return {type: "reproduce", direction: space};
        }
        let plant = view.find("*");
        if (plant) {
            return {type: "eat", direction: plant};
        }
        if (view.look(this.direction) !== " ") {
            this.direction = view.find(" ") || "s";
        }
        return {
            type: "move",
            direction: this.direction
        };
    }
}