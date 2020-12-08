class Drop {
  float x;
  float y;
  float z;
  float speed;
  float weight;
  float grav;
  
  Drop() {
    x = random(0, width);
    y = random(-500, -50);
    z = random(0, 10);
    speed = map(z, 0, 10, 1, 20);
    weight = map(z, 0, 10, 0, 2.5);
    grav = map(z, 0, 10, 0.02, 0.2);
  }
  
  void show() {
    stroke(138, 43, 226);
    strokeWeight(weight);
    
    line(x, y, x, y+10);
  }
  
  void update() {
    y += speed;
    speed += grav;
    
    if(y>height) {
      x = random(0, width);
      y = random(-500, -50);
      z = random(0, 10);
      speed = map(z, 0, 10, 1, 20);
      weight = map(z, 0, 10, 0, 2.5);
    }
  }
}
