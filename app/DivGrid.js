export default class DivGrid {
    constructor(world) {
        this.world = world;
    }

    createGrid(gridElement) {
        let tableElement = this.createElement(gridElement, "table");
        for (let row = 0; row < this.world.getHeight(); row++) {
            let rowElement = this.createElement(tableElement, "tr");
            for (let column = 0; column < this.world.getWidth(); column++) {
                let columnElement = this.createElement(rowElement, "td");
                this.createDiv(columnElement, column, row, this.world.getCharAt(column,
                    row), this.world.getColorAt(column, row));
            }
        }
    }

    createElement(parent, elementType) {
        let element = document.createElement(elementType);
        parent.appendChild(element);
        return element;
    }

    createDiv(parent, x, y, char, color) {
        let element = document.createElement("div");
        element.setAttribute("data-x", x);
        element.setAttribute("data-y", y);
        element.setAttribute("data-type", char);
        element.style.color = color;
        element.textContent = char;
        parent.appendChild(element);
        return element;
    }

    calculateNextGeneration() {
        this.world.turn();
        this.updateDivs();
    }

    updateDivs() {
        let gridElement = document.querySelector("#grid");
        let tableRows = gridElement.querySelectorAll("tr");
        for (let row = 0; row < tableRows.length; row++) {
            let divs = tableRows[row].querySelectorAll("div");
            for (let column = 0; column < divs.length; column++) {
                let div = divs[column];
                div.textContent = this.world.getCharAt(column, row);
                div.style.color = this.world.getColorAt(column, row);
            }
        }
    }

    clearGrid() {
        let gridElement = document.querySelector("#grid");
        while (gridElement.lastChild) {
            gridElement.removeChild(gridElement.lastChild);
        }
    }
}