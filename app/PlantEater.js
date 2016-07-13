import Critter from './Critter';

export default class PlantEater extends Critter {
    constructor() {
        super(20);
    }

    act(view) {
        var space = view.find(" ");
        if (this.energy > 60 && space) {
            return {type: "reproduce", direction: space};
        }
        var plant = view.find("*");
        if (plant) {
            return {type: "eat", direction: plant};
        }
        if (space) {
            return {type: "move", direction: space};
        }
    }
}