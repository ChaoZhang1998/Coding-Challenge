class Box {  
  PVector pos;
  float r;
  
  Box(float x_, float y_, float z_, float r_) {    
    pos = new PVector(x_, y_, z_);
    r = r_;
  }
  
  ArrayList generate() {
    ArrayList<Box> boxes = new ArrayList();
    
    for(int x=-1; x<=1; x++) {
      for(int y=-1; y<=1; y++) {
        for(int z=-1; z<=1; z++) {
          int sum = abs(x) + abs(y) + abs(z);
          
          if(sum>1) {
            float newR = r/3;
            Box box = new Box(pos.x+x*newR, pos.y+y*newR, pos.z+z*newR, newR);
            boxes.add(box);
          }
        }
      }
    }
    
    return boxes;
  }
  
  void show() {
    pushMatrix();
    translate(pos.x, pos.y, pos.z);
    
    fill(255);
    noStroke();
  
    box(r);
    popMatrix();
  }
}
