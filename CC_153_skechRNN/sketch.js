// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/153-interactive-sketchrnn.html
// https://youtu.be/ZCXkvwLxBrA
// https://editor.p5js.org/codingtrain/sketches/hcumr-aua

let sketchRNN;
let currentStroke;
let x, y;
let nextPen = 'down';
let seedPath = [];
let seedPoints = [];
let personDrawing = false;

function preload() {
  sketchRNN = ml5.sketchRNN('butterfly');
}

function startDrawing() {
  // background(255);

  loop();

  personDrawing = true;
  x = mouseX;
  y = mouseY;
}

function endDrawing() {
  personDrawing = false;
  x = mouseX;
  y = mouseY;
}

function sketchRNNStart() {
  personDrawing = false;

  // Perform RDP Line Simplication
  const rdpPoints = [];
  const total = seedPoints.length;
  const start = seedPoints[0];
  const end = seedPoints[total - 1];
  rdpPoints.push(start);
  rdp(0, total - 1, seedPoints, rdpPoints);
  rdpPoints.push(end);

  // Drawing simplified path
  background(255);
  stroke(0);
  strokeWeight(8);
  beginShape();
  noFill();
  for (let v of rdpPoints) {
    vertex(v.x, v.y);
  }
  endShape();

  x = rdpPoints[rdpPoints.length - 1].x;
  y = rdpPoints[rdpPoints.length - 1].y;

  seedPath = [];
  // Converting to SketchRNN states
  for (let i = 1; i < rdpPoints.length; i++) {
    let strokePath = {
      dx: rdpPoints[i].x - rdpPoints[i - 1].x,
      dy: rdpPoints[i].y - rdpPoints[i - 1].y,
      pen: 'down'
    };
    seedPath.push(strokePath);
  }

  sketchRNN.generate(seedPath, gotStrokePath);
}

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.mousePressed(startDrawing);
  canvas.mouseReleased(endDrawing);
  //canvas.mouseReleased(sketchRNNStart);
  background(255);
  //sketchRNN.generate(gotStrokePath);
  console.log('model loaded');
}

function gotStrokePath(error, strokePath) {
  //console.error(error);
  //console.log(strokePath);
  currentStroke = strokePath;
}

function draw() {
  stroke(0);
  strokeWeight(8);

  if (personDrawing) {
    line(mouseX, mouseY, pmouseX, pmouseY);
    seedPoints.push(createVector(mouseX, mouseY));
  }

  if (currentStroke) {
    if (nextPen == 'end') {
      // sketchRNN.reset();
      // sketchRNNStart();
      // console.log(currentStroke);
      // nextPen = 'down';

      seedPoints = [];
      currentStroke = null;
      nextPen = 'down';
      sketchRNN.reset();
      noLoop();

      return;
    }

    if (nextPen == 'down') {
      line(x, y, x + currentStroke.dx, y + currentStroke.dy);
    }
    x += currentStroke.dx;
    y += currentStroke.dy;
    nextPen = currentStroke.pen;
    currentStroke = null;
    sketchRNN.generate(gotStrokePath);
  }
}

function keyPressed() {
  if (keyCode == ENTER) {
    console.log("1");
    sketchRNNStart();
  }
}