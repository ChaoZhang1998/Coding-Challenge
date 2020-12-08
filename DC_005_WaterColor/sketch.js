/**
 * @module sketch
 * @author: Zhang Chao
 * @since: 2020-05-22 20:10:23
 */

'use strict';

function create_base_poly(x, y, r, nsides) {
    /**
     * Create base poly for test
     */
    let bp;

    bp = rpoly(x, y, r, nsides);
    bp = deform(bp, 5, r / 10, 1);

    return bp;
}

function draw_poly(points, israndom = false) {
    /**
     * Draw a poly based on the point list
     */
    let xoff = 0;
    let yoff = 0;

    if (israndom) {
        xoff = random(-width, width);
        yoff = random(-height, height);
    }

    beginShape();
    for (let i = 0; i < points.length; i++) {
        vertex(points[i].x + xoff, points[i].y + yoff);
    }
    endShape(CLOSE);
}

function polystack(x, y, r, nsides) {
    /**
     * Create many ploys with low alpha for water color texture  
     */
    const stack = [];
    let base_poly, poly, seed;

    base_poly = rpoly(x, y, r, nsides);
    base_poly = deform(base_poly, 5, 15, 2);
    seed = int(random(1000));

    // Create 100 polys based on the base poly
    for (let i = 0; i < 100; i++) {
        noiseSeed(seed);

        poly = deform(base_poly, 5, random(r / 10, r / 4), 4);
        stack.push(poly);
    }

    return stack;
}

function draw_stack(stack, israndom = false) {
    /**
     * Iterate and draw every poly in stack
     */
    for (let i = 0; i < stack.length; i++) {
        let poly = stack[i];
        draw_poly(poly, israndom);
    }
}

function stacklist_add(stacklist, stack, c) {
    /**
     * Match the stack with its color
     */
    stacklist.push(stack);
    colors.push(c);
}

function stacklist_draw(stacklist, colors, interleave, israndom = false) {
    /**
     * Draw all polys in stack of stacklist
     */
    let layer = 0;
    let all_empty;

    while (true) {
        all_empty = true;
        console.log("drawing layers " + layer + "--" + (layer + interleave));
        for (let i = 0; i < stacklist.length; i++) {
            fill(colors[i]);
            console.log("stacklist " + i + " using color " + colors[i]);

            // Every stack will draw 5 layers in one step
            let stack = stacklist[i];
            for (let j = layer; j < layer + interleave; j++) {
                if (j < stack.length) {
                    all_empty = false;
                    draw_poly(stack[j], israndom);
                }
            }
        }
        layer += interleave;
        if (all_empty) break;
    }
}

let canvas;

const stacklist = []; // Save all polys to be drawn
const colors = []; // Save colors for stacks

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    background(255);

    noStroke();

    // const stack1 = polystack(width / 5, height / 2, width / 2, 10);
    // const stack2 = polystack(4 * width / 5, height / 2, width / 2, 10);

    // stacklist_add(stacklist, stack1, color(142, 219, 167, 4));
    // stacklist_add(stacklist, stack2, color(197, 129, 93, 4));

    // const stack = polystack(width / 2, height / 2, width / 2, 10);
    // stacklist_add(stacklist, stack, color(197, 129, 93, 4));
    // stacklist_draw(stacklist, colors, 5, true);

    // grid(); // Canvas texture
}

function draw() {

}

function keyPressed() {
    if (key == 's') {
        saveCanvas(canvas, 'WaterColor', 'jpg');
    }
}