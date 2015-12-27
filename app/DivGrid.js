var DivGrid = function(world) {
  this.world = world;
};

DivGrid.prototype.createGrid = function(gridElement) {
  var tableElement = this.createElement(gridElement, "table");
  for (var row = 0; row < this.world.getHeight(); row++) {
    var rowElement = this.createElement(tableElement, "tr");
    for (var column = 0; column < this.world.getWidth(); column++) {
      var columnElement = this.createElement(rowElement, "td");
      this.createDiv(columnElement, column, row, this.world.getCharAt(column,
          row), this.world.getColorAt(column, row));
    }
  }
};

DivGrid.prototype.createElement = function(parent, elementType) {
  var element = document.createElement(elementType);
  parent.appendChild(element);
  return element;
};
DivGrid.prototype.createDiv = function(parent, x, y, char, color) {
  var element = document.createElement("div");
  element.setAttribute("data-x", x);
  element.setAttribute("data-y", y);
  element.setAttribute("data-type", char);
  element.style.color = color;
  element.textContent = char;
  // element.value = world.value;
  parent.appendChild(element);
  // element.addEventListener("click", function() {
  // var x = this.getAttribute('data-x');
  // var y = this.getAttribute('data-y');
  // var type = this.getAttribute('data-type');
  // // TODO how to access world in a object oriented manner?
  // world.setValue(x, y, this.checked);
  // });
  return element;
};
DivGrid.prototype.calculateNextGeneration = function() {
  // var nextGeneration = this.world.calculateNextGeneration();
  this.world.turn();
  this.updateCheckboxes();
};
DivGrid.prototype.updateCheckboxes = function() {
  var gridElement = document.querySelector("#grid");
  var tableRows = gridElement.querySelectorAll("tr");
  for (var row = 0; row < tableRows.length; row++) {
    // TODO rename checkbox to div
    var checkboxes = tableRows[row].querySelectorAll("div");
    for (var column = 0; column < checkboxes.length; column++) {
      var checkbox = checkboxes[column];
      checkbox.textContent = this.world.getCharAt(column, row);
      checkbox.style.color = this.world.getColorAt(column, row);
    }
  }
};
DivGrid.prototype.clearGrid = function() {
  var gridElement = document.querySelector("#grid");
  while (gridElement.lastChild) {
    gridElement.removeChild(gridElement.lastChild);
  }
};

module.exports = DivGrid;
