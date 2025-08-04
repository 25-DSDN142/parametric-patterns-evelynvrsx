//your parameter variables go here!
let flowerX = 100;
let flowerY = 100;
let flowerDiameter = 90;
let petalNum = 10;

let miniFlowers = 9;

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
  background(24, 25, 56); // dark mode
  //background(255,248,222); // light mode
}

function my_symbol() { 
  // // Color variable dark mode
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

  // Color variable light mode 
  // let darkRed = color(169, 34, 9);
  // let orange = color(246,89,63);
  // let cinereous = color(185,132,106);
  // let darkBlue = color(88,98,106);
  // let grey = color(153,155,154);

  // colors.push(darkRed);
  // colors.push(orange);
  // colors.push(cinereous);
  // colors.push(darkBlue);
  // colors.push(grey);

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
  //stroke(230, 209, 194); // light brown for light mode 
  stroke(125, 102, 86); //dark brown for dark mode
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
