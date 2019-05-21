let crosses = [];
let clickedsound;
let powersound;
let target;
let star = false;
let targetimgs = [];
var canvas;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function preload() {
  target = loadImage("img/cross.png");

  for (let i = 0; i < 2; i++) {
    targetimgs[i] = loadImage(`img/cross${i}.png`);
  }
  clickedsound = loadSound("audio/clicked.mp3");
  powersound = loadSound("audio/powerup.wav");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  for (let i = 0; i < 8; i++) {
    let x = random(windowWidth);
    let y = random(windowHeight);
    let r = random(5, 90);
    // let kitten = random(targetimgs);
    let b = new Cross(x, y, r);
    crosses.push(b);
  }
  avatar = new Dj();
  clickedsound.setVolume(0.1);
  powersound.setVolume(0.2);
}

function mousePressed() {
  for (let i = 0; i < crosses.length; i++) {
    crosses[i].clicked(mouseX, mouseY);
    avatar.clicked(mouseX, mouseY);
  }
}

function draw() {
  clear();

  avatar.fly();
  avatar.show();

  for (let i = 0; i < crosses.length; i++) {
    if (star === true) {
      crosses[i].moveup();
      star = false;
    } else {
      crosses[i].movedown();
      star = true;
    }

    crosses[i].show();
  }
}

class Cross {
  constructor(x, y, r, img) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.kitten = random(targetimgs);
  }

  clicked(px, py) {
    //let d = dist(px, py, this.x, this.y);
    //if (d < this.r) {
    if (
      px > this.x &&
      px < this.x + this.r &&
      py > this.y &&
      py < this.y + this.r
    ) {
      this.kitten = target;
      clickedsound.play();

      // random(targetimgs);
    }
  }
  movedown() {
    // this.x = this.x + random(-1, 1);

    this.y = this.y - 2;
  }

  moveup() {
    // this.x = this.x + random(-1, 1);

    this.y = this.y + 2;
  }

  show() {
    image(this.kitten, this.x, this.y, this.r, this.r);
    // stroke(255);
    // strokeWeight(4);
    // fill(this.brightness, 125);
    // ellipse(this.x, this.y, this.r * 2);
  }
}
class Dj {
  constructor() {
    this.x = 800;
    this.y = 600;
    this.r = 50;
    this.dj = loadImage("img/dj.png");
  }
  clicked(px, py) {
    //let d = dist(px, py, this.x, this.y);
    //if (d < this.r) {
    if (
      px > this.x &&
      px < this.x + this.r &&
      py > this.y &&
      py < this.y + this.r
    ) {
      powersound.play();

      // random(targetimgs);
    }
  }
  fly() {
    this.x = this.x - 2;
    this.y = this.y - 2;
  }

  show() {
    image(this.dj, this.x, this.y, this.r, 100);
    // stroke(255);
    // strokeWeight(4);
    // fill(this.brightness, 125);
    // ellipse(this.x, this.y, this.r * 2);
  }
}
