var input;
var matrix;
var cellSize = 5;

function setup() {
  var lyrics = `Yeah, yeah
  No need to pretend, she got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends, yeah
  No need to pretend, she got a little bit of drama with her friends
  Tumblr dreamin' ridin' in a Benz
  You don't smoke but it's cool while you're friends
  Silvercity with your girls on the weekend
  Seventeen, nights stay out past ten
  House party ting turn up with your mans
  Arguments all day with your 'rents
  Just to go out, gotta fight for this shit
  Gotta realize you're a high school girl
  Don't matter how you put it, used to fuck niggas
  But you don't trust niggas, nah-nah
  But you don't trust niggas, nah-nah, yeah
  But they still trust you
  They still fuck with you
  Anything you do, anything you do
  Everything's for you
  Drama is for you
  Take that L, you lose
  Take that L, you lose
  No need to pretend, she got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends, yeah
  Every lost girl I know is over twenty-six
  Every lost girl I know is just too afraid to admit it
  You give your body to me, I'll body that like a savage
  Give and take, you give it to 'em, they take that shit for granted, yeah
  Different than it was before
  People 'round you want it more
  B-F-F, oh yeah, for sure
  Wonder what they in it for
  Take your last relationship
  Look how good you treated him
  You could birth like four of him
  Girl, you never needed him
  But they still need you
  They still fuck with you
  Anything you do, anything you do
  Everything's for you
  Drama is for you
  Take that L, you lose
  Girl, that's not me
  Oh, girl that's not me
  Oh, girl that's not me (drama is for you, take that L, you lose)
  Girl that's not me (drama is for you, take that L, you lose)
  Girl that's not me (drama is for you, take that L, you lose)
  Oh, girl that's not me (drama is for you, take that L, you lose)
  Oh, girl that's not me (drama is for you, take that L, you lose)
  No need to pretend, she got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends
  She got a little bit of drama with her friends, yeah
  No need to pretend, she got a little bit of drama with her friends
  No need to pretend, she got a little bit of drama with her friends
  No, no, need to pretend, no, no need to pretend
  Drama is for you, take that L you lose
  Drama is
  Drama is
  Drama is for you, take that L you lose, take that L, you lose
  No need to pretend, she got a little bit of drama with her friends`;

  createElement("div", "Remove all special characters!");
  input = createElement("textarea", lyrics);
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