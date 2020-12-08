/**
 * @module brushes
 * @author: Zhang Chao
 * @since: 2020-05-22 20:21:43
 */

'use strict';

function rpoly(x, y, r, nsides) {
    /**
     * Create a point list for an n-ploy 
     */
    const points = [];
    const angle = TWO_PI / nsides;

    // Iterate over points
    let sx, sy;
    for (let a = 0; a < TWO_PI; a += angle) {
        sx = x + cos(a) * r;
        sy = y + sin(a) * r;
        points.push(createVector(sx, sy));
    }

    return points;
}

function deform(points, depth, variance, vdiv) {
    /**
     * Deform every egde and create a new point list
     */
    let sx1, sy1;
    let sx2 = 0;
    let sy2 = 0;

    const new_points = [];
    if (points.length < 2) {
        return new_points;
    }

    // Iterate over points in a pairwise fashion
    for (let i = 0; i < points.length; i++) {
        sx1 = points[i].x;
        sy1 = points[i].y;
        sx2 = points[(i + 1) % points.length].x;
        sy2 = points[(i + 1) % points.length].y;

        new_points.push(createVector(sx1, sy1));
        subdivide(new_points, sx1, sy1, sx2, sy2, depth, variance, vdiv);
    }

    return new_points;
}

function subdivide(new_points, x1, y1, x2, y2, depth, variance, vdiv) {
    /**
     * Randomly subdivide every edge in depth times
     */
    let midx, midy;
    let nx, ny;

    // Iterate depth times to create more points
    if (depth >= 0) {
        midx = (x1 + x2) / 2;
        midy = (y1 + y2) / 2;

        nx = midx + randomGaussian() * variance;
        ny = midy + randomGaussian() * variance;

        subdivide(new_points, x1, y1, nx, ny, depth - 1, random(variance / vdiv), vdiv);
        new_points.push(createVector(nx, ny)); // Append every point in turn
        subdivide(new_points, nx, ny, x2, y2, depth - 1, random(variance / vdiv), vdiv);
    }
}

