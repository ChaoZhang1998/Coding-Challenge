Star[] stars = new Star[800];

void setup() {
  size(800, 800);
  
  for(int i=0; i<800; i++) {
    stars[i] = new Star();
  }
}

void draw() {
  background(0);
  translate(width/2, height/2);
  
  for(int i=0; i<800; i++) {
    stars[i].update();
    stars[i].show();
  }
}
