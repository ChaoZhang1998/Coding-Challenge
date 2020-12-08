class Food {
  PVector pos;
  
  int scl;
  
  Food(int _scl) {
    scl = _scl;
  }
  
  void pickLocation() {
    int cols = width / scl;
    int rows = height / scl;
    
    pos = new PVector(floor(random(cols)), floor(random(rows)));
    pos.mult(scl);
  }
  
  PVector get_pos() {
    return pos;
  }
  
  void show() {
    noStroke();
    fill(255, 0, 100);
    
    rect(pos.x, pos.y, scl, scl);
  }
}
