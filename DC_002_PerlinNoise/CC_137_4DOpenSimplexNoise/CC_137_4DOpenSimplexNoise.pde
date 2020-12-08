float zoff = 0;
float increment = 0.03;

OpenSimplexNoise openSimplexNoise;

void setup() {
  size(640, 360);
  openSimplexNoise = new OpenSimplexNoise();
}

void draw() {
  //float percent = 0;
  //openSimplexNoise4D(percent);
  
  //openSimplexNoise3D();
  
  render();
}

void openSimplexNoise4D(float percent) {
  float angle = map(percent, 0, 1, 0, TWO_PI);
  float uoff = map(sin(angle), -1, 1, 0, 2);
  float voff = map(sin(angle), -1, 1, 0, 2);

  float xoff = 0;
  loadPixels();
  for (int x = 0; x < width; x++) {
    float yoff = 0;
    for (int y = 0; y < height; y++) {
      float n;
      
      // 4D Open Simplex Noise is very slow!
      n = (float) openSimplexNoise.eval(xoff, yoff, uoff, voff);
      
      float bright = n > 0 ? 255 : 0;
      
      // Draw every pixels with bright above
      pixels[x + y * width] = color(bright);
      yoff += increment;
    }
    xoff += increment;
  }
  updatePixels();

  zoff += increment;
}

void openSimplexNoise3D() {
  float xoff = 0;
  loadPixels();
  for (int x = 0; x < width; x++) {
    float yoff = 0;
    for (int y = 0; y < height; y++) {
      float n;
      
      // If you aren't worried about looping run this instead for speed!
      n = (float) openSimplexNoise.eval(xoff, yoff, zoff);
      
      float bright = n > 0 ? 255 : 0;
      
      // Draw every pixels with bright above
      pixels[x + y * width] = color(bright);
      yoff += increment;
    }
    xoff += increment;
  }
  updatePixels();

  zoff += increment;
}

void render() {
  float xoff = 0;
  loadPixels();
  for (int x = 0; x < width; x++) {
    float yoff = 0;
    for (int y = 0; y < height; y++) {
      // Classical Perlin Noise
      float n1 = noise(xoff, yoff, zoff);
      
      
      // Simplex Noise
      float n2 = (float) openSimplexNoise.eval(xoff, yoff, zoff);
      
      // Compare this two noise
      float bright;
      if (x < width / 2) {
        // The left is Classical Perlin Noise
        bright = map(n1, 0, 1, 0, 255);
      } else {
        // The right is Simplex Noise
        bright = map(n2, -1, 1, 0, 255);
      }
      
      // Draw every pixels with bright above
      pixels[x + y * width] = color(bright);
      yoff += increment;
    }
    xoff += increment;
  }
  updatePixels();

  zoff += increment;
}
