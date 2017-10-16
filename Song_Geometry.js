var input;
var matrix;
var cellSize = 5;

function setup() {
  
  createElement("div", "Remove all special characters!");
  input = createElement("textarea", "these are test lyrics");
  input.size(600,100);
  input.input(loadLyrics);
  createElement("hr");
  createCanvas(1000, 1000);

  background(0);
  loadLyrics();
}

function loadLyrics() {
  let text = input.value();
  
  let textArray = split(text, " ");
  trim(textArray);
  matrix = textArray;
  
  drawMatrix();
  
}

function draw() {
  //not need, updates only happen when text changes
}

function drawMatrix() {
  let shade = color(100, 100, 100);
  console.log(shade);
  resizeCanvas(cellSize * matrix.length, cellSize * matrix.length);
  background(0);
  let cellW = Math.round(width / matrix.length);
  let cellH = Math.round(height / matrix.length);
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      if (matrix[x] === matrix[y]) {
        fill(getColor(shade));
        rect(x * cellW, y * cellH, cellW, cellH);
      }
    }
  }
}

function getColor(color) {
  if (color.levels[0] < 255) {
    color.levels[0]++;
    return color;
  } else if (color.levels[1] < 255) {
    color.levels[1]++;
    return color;
  } else if (color.levels[2] < 255) {
    color.levels[2]++;
    return color;
  } else {
    color.levels[0] = 100;
    color.levels[1] = 100;
    color.levels[2] = 100;
    return color;
  }

}