let zoff = 0;
let inc = 0.1;

let scl = 10;
let cols, rows;

let particles = [];
let flowflied;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    cols = floor(width / scl);
    rows = floor(height / scl);

    for (let index = 0; index < 10000; index++) {
        particles[index] = new Particle();
    }

    flowflied = new Array(cols * rows);
    // frameRate(60);
}

function draw() {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
        let yoff = 0;
        for (let y = 0; y < rows; y++) {
            let index = x * rows + y;
            let angle = map(noise(xoff, yoff, zoff), 0, 1, 0, 4 * TWO_PI);
            let v = p5.Vector.fromAngle(angle);
            v.setMag(1); // 设置力的大小
            flowflied[index] = v;

            // push();
            // translate(x * scl, y * scl);
            // rotate(v.heading());
            // stroke(255, 50);
            // line(0, 0, scl, 0);
            // pop();

            yoff += inc;
        }

        xoff += inc;
    }

    zoff += 0.01;

    for (let index = 0; index < particles.length; index++) {
        particles[index].follow(flowflied);
        particles[index].update();
        particles[index].edge();
        particles[index].show();
    }
}