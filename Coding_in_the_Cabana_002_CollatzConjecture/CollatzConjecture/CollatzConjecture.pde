// Collatz Conjecture Visualization
// if n is add, n = 3n+1
// if n is even, n = n/2
// any number will end up being the number "1"

import processing.pdf.*;
import java.util.Date;

void setup() {
  beginRecord(PDF, "collatz.pdf");
  
  //size(1080, 720);
  fullScreen();
  background(0);
  frameRate(300);
  
  float len = height / 100.0;
  float angle = 0.15;
  for (int i = 1; i < 100000; i++) {
    IntList sequence = new IntList();
    int n = i;
    do {
      sequence.append(n);
      n = collatz(n);
    } while (n != 1);
    sequence.append(1);
    sequence.reverse();
    
    resetMatrix();
    translate(width/2, height);
    for (int j = 0; j < sequence.size(); j++) {
      int value = sequence.get(j);
      if (value % 2 == 0) {
        rotate(-angle);
      } else {
        rotate(angle);
      }
      
      stroke(255, 2);
      strokeWeight(2);
      line(0, 0, 0, -len);
      translate(0, -len);
    }
  }
  
  endRecord();
}

void draw() {
  float len = 10.0;
  float angle = 0.15;
  IntList sequence = new IntList();
  int n = ceil(millis()/10);

  do {
    sequence.append(n);
    n = collatz(n);
  } while (n != 1);
  sequence.append(1);
  sequence.reverse();
  
  resetMatrix();
  translate(width/2, height);
  for (int j = 0; j < sequence.size(); j++) {
    int value = sequence.get(j);
    if (value % 2 == 0) {
      rotate(-angle);
    } else {
      rotate(angle);
    }
    
    stroke(255, 2);
    strokeWeight(2);
    line(0, 0, 0, -len);
    translate(0, -len);
  }
}

int collatz(int n) {
  //even
  if (n % 2 == 0) {
    return n / 2;
  //odd  
  } else {
    return (3 * n + 1) / 2;
  }
}
