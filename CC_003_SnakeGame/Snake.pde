class Snake {
  float pos_x = 0;
  float pos_y = 0;
  
  float x_speed = 1;
  float y_speed = 0;
  
  int scl;
  
  int len = 1;
  ArrayList<PVector> body = new ArrayList<PVector>();
  
  Snake(int _scl) {
    scl = _scl;
    body.add(new PVector(pos_x, pos_y));
  }
  
  void dir(float x_dir, float y_dir) {
    x_speed = x_dir;
    y_speed = y_dir;
  }
  
  boolean eat(PVector food_pos) {
    if(pos_x == food_pos.x && pos_y == food_pos.y) {
      len++;
      body.add(new PVector(pos_x-x_speed*scl, pos_y+y_speed*scl));
      return true;
    } else {
      return false;
    }
  }
  
  void death() {
    for(int i=0; i<body.size()-1; i++) {
      PVector pos = body.get(i);
      float d = dist(pos_x, pos_y, pos.x, pos.y);
      
      if(d < 1) {
        initialize();
        println("start over!");
      }
    }
    
    if(len == 1) {
      if(pos_x==0 && x_speed==-1) {
        initialize();
        println("start over!");
      } else if(pos_x==width && x_speed==1) {
        initialize();
        println("start over!");
      } else if(pos_y==0 && y_speed==-1) {
        initialize();
        println("start over!");
      } else if(pos_y==height && y_speed==1) {
        initialize();
        println("start over!");
      }
    }
  }
  
  void initialize() {
    len = 1;
    body.clear();
    
    pos_x = 0;
    pos_y = 0;
    x_speed = 1;
    y_speed = 0;
    
    body.add(new PVector(pos_x, pos_y));
  }
   
  void upgrade() {
    if(len > 0) {
      if(body.size()==len && !body.isEmpty()) {
        body.remove(0);
      }
      body.add(new PVector(pos_x, pos_y));
    }
    
    pos_x = pos_x + x_speed * scl;
    pos_y = pos_y + y_speed * scl;
    
    pos_x = constrain(pos_x, 0, width);
    pos_y = constrain(pos_y, 0, height);
  }
  
  void show() {
    noStroke();
    fill(255);
    
    for(PVector b: body) {
      rect(b.x, b.y, scl, scl);
    }
  }
}
