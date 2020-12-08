let inc = 0.01;

function setup() {
    createCanvas(200, 200);
    
    pixelDensity(1);
    noiseDetail(8, 0.5);
}

function draw() {
    background(51);

    loadPixels();
    let xoff = 0;
    for (let x = 0; x < width; x++) {
        let yoff = 0;
        for (let y = 0; y < height; y++) {
            let r = map(noise(xoff, yoff), 0, 1, 0, 255);
            let index = (x + y * width) * 4;
            pixels[index + 0] = r;
            pixels[index + 1] = r;
            pixels[index + 2] = r;
            pixels[index + 3] = 255;

            yoff += inc;
        }

        xoff += inc;
    }
    updatePixels();
}