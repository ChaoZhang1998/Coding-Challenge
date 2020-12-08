int w, h;
int cols, rows;
int scl = 20;

float xoff = 0;
float yoff = 0;
float flying = 0;

float[][] terrain;

void setup() {
  size(600, 600, P3D);
  
  w = 2 * width;
  h = 2 * height;
  
  cols = w / scl;
  rows = h / scl;
  
  noiseDetail(8);
  
  frameRate(60);
}

void draw() {
  background(0);
  
  terrain = new float[cols][rows + 1];
  xoff = 0;
  for(int x = 0; x < cols; x++) {
    yoff = flying;
    for(int y = 0; y < (rows + 1); y++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      yoff += 0.1;
    }
    xoff += 0.1;
  }
  flying -= 0.06;
  
  translate(width / 2, height / 2, 0);
  rotateX(PI / 3);
  
  translate(-w / 2, -h / 2, 0);
  noFill();
  stroke(255);
  for(int x = 0; x < (cols - 1); x++) {
    beginShape(TRIANGLE_STRIP);
    for(int y = 0; y < (rows + 1); y++) {
      //rect(x * scl, y * scl, scl, scl);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex((x + 1) * scl, y * scl, terrain[x + 1][y]);
    }
    endShape();
  }
}
