//your parameter variables go here!
let flowerX = 100;
let flowerY = 100;
let flowerDiameter = 90;
let petalNum = 10;

let miniFlowers = 5;

let numberOfSwirls = 3;
let swirlCount = 3;

let colors = [];

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  pWallpaper.output_mode(GRID_WALLPAPER);
  
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(false); //set this to false when you're ready to print

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
  let blue = color(173, 216, 230);

  // Push colors to the array
  colors.push(gold);
  colors.push(pink);
  colors.push(red);
  colors.push(yellow);
  colors.push(blue);

  let defaultColor = random(colors);

  // how many motifs are in the 200x200 screen
  if (miniFlowers < 7) {
    flowerDiameter = 40;
    stroke(defaultColor);
    strokeWeight(1);


    for (let i = 0; i < miniFlowers; i++) {
      flowerX = floor(random(20, 190));
      flowerY = floor(random(20, 180));
      fill(defaultColor);
      insideFlowerPetals(flowerX, flowerY, petalNum, defaultColor);

      // middle of flower stroke
      push()
        strokeWeight(2);
        stroke(32,31,34); //background color
        fill(defaultColor);
        ellipse(flowerX, flowerY, flowerDiameter/5, flowerDiameter/5);
      pop();

      outsideFlowerPetals(flowerX, flowerY);
    }
  }
  else {
    backgroundSketch();
  }

  // flower petal 
  fill(defaultColor);
  noStroke();
  insideFlowerPetals(flowerX, flowerY, petalNum, defaultColor);

  // middle of flower
  strokeWeight(2);
  stroke(32,31,34); //background color
  fill(defaultColor);
  ellipse(flowerX, flowerY, flowerDiameter/5, flowerDiameter/5);

  // outside flower petal
  strokeWeight(2);
  stroke(defaultColor);
  noFill();
  outsideFlowerPetals(flowerX, flowerY);
}

// make flower petals 
function insideFlowerPetals(midX, midY, petalNumber, color) {
  let petalRotation = 360/petalNumber;
  
  for (let i = 0; i < petalNumber; i++) {
   push();
      fill(color);
      noStroke();

      translate(midX, midY);
      rotate(petalRotation*i);
      ellipse(0, 0-(flowerDiameter/5), flowerDiameter/6, flowerDiameter/3);
    pop();
  }
}

// make outside flower petals
function outsideFlowerPetals(midX, midY) {
  let petalRotation = 360/5;
  noFill();
  
  for (let i = 0; i < 5; i++) {
   push();
      translate(midX, midY);
      rotate(petalRotation*i);

      arc(0, 0-(flowerDiameter/5), flowerDiameter, flowerDiameter/2, 45, 360);

    pop();
  }
}

function backgroundSketch() {
  noFill();
  stroke(161, 141, 103); // gold color
  strokeWeight(2);

  for (let num = 0; num < numberOfSwirls; num++) {
    let startX = random(20, 180);
    let startY = random(20, 180);
    let swirlSize = 30;

    // Draw a chain of connected swirls
    for (let i = 0; i < swirlCount; i++) {
      let [endX, endY] = drawSwirl(startX, startY, swirlSize, i * 90); // rotate each swirl
      startX = endX;
      startY = endY;
    }
  }
}
  

function drawSwirl(x, y, size, startAngle = 0) {
  noFill();
  stroke(91, 38, 133); // dark purple
  //stroke(72, 71, 115); //dark brown
  //stroke(87, 74, 41); //dark blue
  strokeWeight(2);

  let px, py;

  beginShape();
  for (let t = 0; t <= 540; t += 10) {
    let r = size * (1 - t / 540);
    px = x + cos(t + startAngle) * r;
    py = y + sin(t + startAngle) * r;
    curveVertex(px, py);
  }
  endShape();

  // Return the final (end) position so the next swirl can start from here
  return [px, py];
}
