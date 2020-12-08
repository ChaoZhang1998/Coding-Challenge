/**
* @module grids
* @author: Zhang Chao
* @since: 2020-05-23 16:14:11
*/

'use strict';

function gridline(x1, y1, x2, y2) {
    /**
     * Draw an old style line
     */
    if (x1 > x2) {
        [x1, x2] = [x2, x1];
        [y1, y2] = [y2, y1];
    }

    let dx = x2 - x1;
    let dy = y2 - y1;
    let step = 1;

    let sx = x1;
    let sy = y1;
    for (let x = x1 + step; x <= x2; x += step) {
        let y = y1 + step * dy * (x - x1) / dx;
        strokeWeight(1 + map(noise(sx, sy), 0, 1, -0.5, 0.5));
        line(sx, sy, x + map(noise(x, y), 0, 1, -1, 1), y + map(noise(x, y), 0, 1, -1, 1));
        sx = x;
        sy = y;
    }
}

function grid() {
    /**
     * Old style rectangle mesh
     */
    let spacing = 5;
    for (let i = -width; i < height + width; i += spacing) {
        stroke(255, random(20, 50));
        gridline(i, 0, i + height, height);
    }
    for (let i = height + width; i >= -width; i -= spacing) {
        stroke(255, random(20, 50));
        gridline(i, 0, i - height, height);
    }
}

function mesh() {
    /**
     * Rectangle mesh
     */
    let spacing = 5;
    for (let i = -width; i < height + width; i += spacing) {
        stroke(255, random(20, 50));
        line(i, 0, i + height, height);
    }
    for (let i = height + width; i >= -width; i -= spacing) {
        stroke(255, random(20, 50));
        line(i, 0, i - height, height);
    }
}