let n = 0;
let d = 0;
let nSlider;

function setup() {
	createCanvas(480,480);
	nSlider = createSlider(1,10,4,1);
	dSlider = createSlider(1,10,4,1);
}

function draw() {
	// Rose Formular is r = cos(n*i), x = r*cos(i), y = r*sin(i), n = 1, 2, 3, ...

	background(51);
	translate(width/2,height/2);

	n = nSlider.value();
	d = dSlider.value();
	let k = n / d;

	console.log('n=', n);
	console.log('d=', d);
	console.log('k=', k);

	beginShape();
	noFill();
	stroke(255);
	strokeWeight(1);
	for (let i = 0; i < TWO_PI*d; i += 0.02) {
		let r = 150 * cos(k*i);
		let x = r * cos(i);
		let y = r * sin(i);
		vertex(x,y);
	}
	endShape();
}
