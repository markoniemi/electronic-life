import Critter from './Critter';

export default class Plant extends Critter {
    constructor() {
        super(Plant.randomEnergy());
    }

    act(view) {
        if (this.energy > 15) {
            let space = view.find(" ");
            if (space) {
                return {type: "reproduce", direction: space};
            }
        }
        if (this.energy < 20) {
            return {type: "grow"};
        }
    };

    static randomEnergy() {
        return 3 + Math.random() * 4;
    }
}