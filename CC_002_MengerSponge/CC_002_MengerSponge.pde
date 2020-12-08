float a = 0;
ArrayList<Box> sponge;
Box box;

void setup() {
  size(400, 400, P3D);
  
  box = new Box(0, 0, 0, 200);
  sponge = new ArrayList();
  
  sponge.add(box);
}

void draw() {
  background(51);
  lights();
  
  translate(width/2, height/2);
  rotateX(a);
  rotateY(a * 0.4);
  rotateZ(a * 0.5);
  
  for(Box box: sponge) {
    box.show();
  }
 
  a += 0.01;
}

void mousePressed() {
  ArrayList<Box> newSponge = new ArrayList();
  
  for(Box box: sponge) {
    newSponge.addAll(box.generate());
  }
  
  sponge = newSponge;
}
