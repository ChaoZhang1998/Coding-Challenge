// how to draw an image based on Hilbert Curve -
// https://editor.p5js.org/D_Snyder/sketches/6iGNyqly

int order = 6;
int N = int(pow(2, order));
int total = N * N;

PVector[] path = new PVector[total]; // create an array to store the real location of every point

void setup() {
  size(512, 512);
  background(0);
  
  for(int i = 0; i < total; i++) {
    path[i] = hilbert(i);
    float len = width / N;
    path[i].mult(len);
    path[i].add(len/2, len/2);
  }
}

int counter = 0;

void draw() {
  background(0);
  
  stroke(255);
  strokeWeight(2);
  noFill();
  
  beginShape();
  for(int i = 1; i < counter; i++) {
    line(path[i-1].x, path[i-1].y, path[i].x, path[i].y);
  }
  endShape();
  
  //strokeWeight(4);
  //for(int i = 0; i < path.length; i++) {
  //  point(path[i].x, path[i].y);
  //  text(i, path[i].x+5, path[i].y);
  //}
  
  counter += 5;
  if(counter >= path.length) {
    counter = 0;
  }
}

PVector hilbert(int i) {
  PVector[] points = {
    new PVector(0, 0),
    new PVector(0, 1),
    new PVector(1, 1),
    new PVector(1, 0), 
  }; // points to store the serial number of every point
  
  int index = i & 3;
  PVector v = points[index];
    
  for (int j = 2; j <= order; j++) {
    i = i >>> 2;
    index = i & 3;
    
    float len = pow(2, j-1);
    if (index == 0) {
      float temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index == 1) {
      v.y += len;
    } else if (index == 2) {
      v.x += len;
      v.y += len;
    } else if (index == 3) {
      float temp = len - 1 - v.x;
      v.x = len - 1 - v.y;
      v.y = temp;
      v.x += len;
    }
  }
  
  return v;
}
