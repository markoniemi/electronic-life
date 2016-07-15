import Vector from './Vector';
import _ from 'underscore/underscore';

export default class View {
    constructor(world, vector) {
        this.world = world;
        this.vector = vector;
    }

    look(dir) {
        let target = this.vector.plus(Vector.directions[dir]);
        if (this.world.grid.isInside(target)) {
            return this.world.charFromElement(this.world.grid.get(target));
        } else {
            return "#";
        }
    }

    findAll(ch) {
        let found = [];
        for (let dir in Vector.directions) {
            if (this.look(dir) === ch) {
                found.push(dir);
            }
        }
        return found;
    }

    find(ch) {
        let found = this.findAll(ch);
        if (found.length === 0) {
            return null;
        }
        return _.sample(found);
    }
}