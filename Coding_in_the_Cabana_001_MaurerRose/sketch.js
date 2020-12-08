let n = 6;
let d = 71;
let initialTime = 0;

let i = 0;

// let n = 0;
// let d = 0;

// let dSlider;

// 函数setup() ：准备阶段
function setup() {

	createCanvas(480,480);
	background(0);
	angleMode(DEGREES);

	initialTime = getTime();

	// dSlider = createSlider(1,180,1);

}

// 函数draw()：作画阶段
function draw() {

	translate(width/2, height/2);
	noFill();

	// d = dSlider.value();

	stroke(255);
	strokeWeight(1);
	beginShape();
	for (let i = 0; i < 361; i++) {
		// Maurer Rose fomular is (sin(nk), k), k = 0, d, 2d, 3d, ...

		let k = i * d;
		let r = 150 * sin(n*k);
		let x = r * cos(k);
		let y = r * sin(k);
		vertex(x,y)
	}
	endShape(CLOSE); // CLOSE: automatically close the path

	stroke(255,0,255,100);
	strokeWeight(4);
	beginShape();
	for (let i = 0; i < 361; i++) {
		// Rose fomular is (sin(nk), k), k = 0, 1, 2, 3, ...

		let k = i;
		let r = 150 * sin(n*k);
		let x = r * cos(k);
		let y = r * sin(k);
		vertex(x,y)
	}
	endShape(CLOSE);

	// n += 0.01;
	// d += 0.03;

}

// // draw a moving rose
// function draw() {
//
// 	let tNow = getTime(); // 当前时刻
// 	let i = (tNow - initialTime)*5;
//
// 	let k = i;
// 	let r = 150 * sin(n*k);
// 	let x = r * cos(k);
// 	let y = r * sin(k);
//
// 	push();
// 	translate(width/2,height/2);
// 	translate(x,y);
// 	scale(50,50);
// 	fill(255);// 填充白色
// 	noStroke();
// 	ellipse(0,0,0.1,0.1); // 画圆形
// 	pop();
//
// }

// get current time
function getTime() {

	return millis()/1000;

}
