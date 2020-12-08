// Learn from Roni Kaufman
// noise接收最多三个参数，可以相应表示最多三个特征
// 三个参数为三个不同的随机化种子，初始状态不确定，输出值始终位于(0, 1)
// 随着随机化种子的变化，输出的随机值在上一个状态的基础上微调，几乎保持了连续性
// 随机化种子由哪些变量决定，就表征随机化种子对应的特征受哪些变量的变化制约

var kMax; // 
var step; // 
var n = 250; // number of blobs
var radius = 80; // diameter of the circle
var inter = 0.05; // difference between the sizes of two blobs
var maxNoise = 500;

var noiseProg = (x) => (x * x);

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 1); // change the color mode, and set the max value as "1"
    angleMode(DEGREES); // change the angle mode as Degrees, from 0 to 360

    noFill();

    noLoop();

    kMax = random(0.5, 1);
    step = 0.01;
}

function draw() {
    background(0);

    for (let i = 0; i < n; i++) {
        // let alpha = 1 - i / n; 
        let alpha = 1 - noiseProg(i / n);
        stroke(0.9, alpha);

        let size = radius + i * inter; // ramp size

        // random(0.5, 1) * (i / n)^(1 / 2)
        // 噪声位置 - 随机化噪声在相邻两个blob之间不同点位置上变化的趋势大小
        let k = kMax * sqrt(i / n);

        // 噪声大小 - 随机化噪声在相邻两个blob之间的间隙表现，在0.05的基础上出入
        let t = i * step;

        // 500 * (i / n)^2, quadratic function
        // 噪声强度 - 噪声整体的强度随着i的变大呈二次函数增强，扩大k和t的影响
        let noisiness = maxNoise * noiseProg(i / n);

        blob(size, width / 2, height / 2, k, t, noisiness);
    }
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
    /*
        size: blob的初始大小
        xCenter: blob中心点的x坐标
        yCenter: blob中心点的y坐标
        k: 噪声位置 - 随机化噪声在相邻两个blob之间不同点位置上变化的趋势大小
        t: 噪声大小 - 随机化噪声在相邻两个blob之间的间隙表现，在0.05的基础上出入
        noisiness: 噪声强度 - 噪声整体的强度随着i的变大呈二次函数增强，扩大k和t的影响
    */

    beginShape();
    let angleStep = 360 / 500; // 500 iterations
    for (let theta = 0; theta < 360; theta += angleStep) {
        
        let r1, r2; // r1，r2的作用是形成blob自身变化趋势的随机种子
        r1 = cos(theta) + 1; // 通过加1打破cos和sin函数自身的对称性
        r2 = sin(theta) + 1;

        let r = size + noise(k * r1, k * r2, t) * noisiness; // Perlin noise
        let x = xCenter + r * cos(theta);
        let y = yCenter + r * sin(theta);
        curveVertex(x, y);
    }
    endShape(CLOSE);
}