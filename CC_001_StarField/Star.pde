class Star {
  float x;
  float y;
  float z;
  
  float pz;
  
  float speed;
  
  Star() {
    x = random(-width, width);
    y = random(-height, height);
    z = random(0, width/2);
    
    pz = z;
    
    speed = 10;
  }
  
  void update() {
    speed = map(mouseX, 0, width, 0, 20);
    z = z - speed;
    
    if(z < 1) {
      x = random(-width, width);
      y = random(-height, height);
      z = random(0, width/2); 
      
      pz = z;
      
      speed = 10;
    }
  }
  
  void show() {
    float sx = map(x/z, 0, 1, 0, width/2);
    float sy = map(y/z, 0, 1, 0, height/2);
    
    float psx = map(x/pz, 0, 1, 0, width/2);
    float psy = map(y/pz, 0, 1, 0, height/2);
    
    //fill(255);
    //noStroke();
    //ellipse(sx, sy, 8, 8);
    
    stroke(255);
    line(psx, psy, sx, sy);
    
    pz = z;
  }
}
