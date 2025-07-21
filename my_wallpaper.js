//your parameter variables go here!
let flowerX = 100;
let flowerY = 100;
let flowerDiameter = 90;

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  //pWallpaper.output_mode(GRID_WALLPAPER);
  
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(true); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 50;
}

function wallpaper_background() {
  background(32,31,34); 
}

function my_symbol() { 
  // Color variable 
  let gold = color(161, 141, 103);
  let pink = color(238,186,198);
  let red = color(169, 67, 69);
  let yellow = color(254,214,123);

  let defaultColor = yellow;

  // flower petal 
  fill(defaultColor);
  noStroke();
  flowerPetals(flowerX,flowerY, 7, defaultColor)

  // middle of flower
  strokeWeight(2);
  stroke(32,31,34);
  fill(defaultColor);
  ellipse(flowerX, flowerY, flowerDiameter/5, flowerDiameter/5);
}

// make flower petals 
function flowerPetals(midX, midY, petalNumber, color) {
  let petalRotation = 360/petalNumber;
  
  for (let i = 0; i < petalNumber; i++) {
   push();
      fill(color);
      noStroke();

      translate(midX, midY);
      rotate(petalRotation*i);
      ellipse(0, 0-20, flowerDiameter/6, flowerDiameter/3);
    pop();
  }
}