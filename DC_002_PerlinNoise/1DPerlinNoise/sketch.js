// let xoff = 0;
// let yoff = 100000;

let inc = 0.01;
let start = 0;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(51);

    // // let x = random(0, width);
    // let x = map(noise(xoff), 0, 1, 0, width);
    // let y = map(noise(yoff), 0, 1, 0, height);
    // ellipse(x, y, 20, 20);

    // xoff += 0.01;
    // yoff += 0.01;

    let offset = start;

    noFill();
    stroke(255);
    beginShape();
    for (let x = 0; x < width; x++) {
        // let y = map(noise(offset), 0, 1, 0, height);
        let p = map(noise(offset), 0, 1, 0, height);
        let s = map(sin(offset), 0, 1, -50, 50);
        let y = p + s;
        curveVertex(x, y);

        offset += inc;
    }
    endShape();

    start += inc;

    // noLoop();
}