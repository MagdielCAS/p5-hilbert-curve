let vw, vh;
let alphabet = ["A", "B"];
let constants = ["F", "-", "+"];
let axiom = "A";
let rules = {
  A: "-BF+AFA+FB-",
  B: "+AF-BFB-FA+"
};

let iterations = 6;
let regex;
let s = 10;
let result = "";
let l = "";
let counter = 0;
let points = 0;

function setup() {
  vw = windowWidth;
  vh = windowHeight;
  createCanvas(vw, vh);
  points = ~~(vw / s);
  iterations = closestPowerOf2(points);
  angleMode(DEGREES);
  regex = new RegExp(`(${alphabet.join("|")})+`, "g");
  result = axiom;
  for (let i = 0; i <= iterations; i++) {
    result = result.replace(regex, s => rules[s]);
  }
  result = result.split("").filter(el => constants.includes(el));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  vw = windowWidth;
  vh = windowHeight;
  points = ~~(vw / s);
  iterations = closestPowerOf2(points);
  result = axiom;
  for (let i = 0; i <= iterations; i++) {
    result = result.replace(regex, s => rules[s]);
  }
  result = result.split("").filter(el => constants.includes(el));
}

function draw() {
  background(0);
  translate(0, vh);
  scale(s);
  stroke(200);
  strokeWeight(1 / s);
  for (var i = 0; i <= points * 2; i++) {
    line(
      (vw / 2 + 0.5 * (i % 2 ? i : 0)) * -1,
      (0 + 0.5 * (i % 2 ? i : 0)) * -1,
      (-vw / 2 + 0.5 * (i % 2 ? i : 0)) * -1,
      (0 + 0.5 * (i % 2 ? i : 0)) * -1
    );
    line(
      0 + 0.5 * (i % 2 ? i : 0),
      vh / 2 + 0.5 * (i % 2 ? i : 0),
      0 + 0.5 * (i % 2 ? i : 0),
      -vh / 2 + 0.5 * (i % 2 ? i : 0)
    );
  }
  stroke(255, 255, 255, 255);
  noFill();
  beginShape();
  strokeWeight(1 / s);
  let theta = 0;
  let r = 1;
  let lastX = 0;
  let lastY = 0;
  for (var i = 0; i <= counter; i = i + 1) {
    var cmd = result[i];
    if (cmd === "+") {
      theta = (theta + 90) % 360;
    }
    if (cmd === "-") {
      theta = (theta - 90) % 360;
    }
    if (cmd === "F") {
      let x = r * cos(theta) + lastX;
      let y = r * sin(theta) + lastY;
      vertex(x, y);
      lastX = x;
      lastY = y;
    }
  }
  counter = counter + (counter < result.length);
  endShape();
}

function closestPowerOf2(n) {
  var m = n;
  for (var i = 0; m > 1; i++) {
    m = m >>> 1;
  }
  if (n & (1 << (i - 1))) {
    i++;
  }
  return i;
}
