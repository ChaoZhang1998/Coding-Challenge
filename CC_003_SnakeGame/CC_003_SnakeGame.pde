int scl = 20;

Snake snake;
Food food;

void setup() {
  size(600, 600);
  
  food = new Food(scl);
  snake = new Snake(scl);
  
  food.pickLocation();
}

void draw() {
  background(51);
  frameRate(10);
  
  if(snake.eat(food.get_pos())) {
    food = new Food(scl);
    food.pickLocation();
  } 
  
  food.show();
  
  snake.death(); 
  snake.upgrade();
  snake.show();
}

void keyPressed() {
  if(keyCode == UP) {
    snake.dir(0, -1);
  } else if(keyCode == DOWN) {
    snake.dir(0, 1);
  } else if(keyCode == RIGHT) {
    snake.dir(1, 0);
  } else if(keyCode == LEFT) {
    snake.dir(-1, 0);
  }
}

//void mousePressed() {
//  snake.len++;
//}
