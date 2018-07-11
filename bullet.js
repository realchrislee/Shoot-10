let bulletDisplay = [
  new Bullet(60, 5),
  new Bullet(75, 5),
  new Bullet(90, 5),
  new Bullet(105, 5),
  new Bullet(120, 5),
  new Bullet(135, 5),
  new Bullet(150, 5),
  new Bullet(165, 5),
  new Bullet(180, 5),
  new Bullet(195, 5),
];

function Bullet(x, y, bDX = 0, bDY = 0) {
  this.x = x;
  this.y = y;
  this.w = 6;
  this.h = 4;
  this.bDX = bDX;
  this.bDY = bDY;
  this.hit = false;
  this.offScreen = false;

  // bullet
  this.draw = function() {
    // let bullet = new Image();
    // bullet.src = './bullet.png';
    // ctx.drawImage(bullet, this.x, this.y, this.w, this.h);
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x+1, this.y+10, this.w, this.h);
  };

  this.update = function() {
    this.y -= bDY;
    this.x -= bDX;
    this.draw();
  };
}

function Debris(x, y, angle) {
  this.x = x;
  this.y = y;
  this.w = 6;
  this.h = 4;
  this.bDX = Math.cos(angle/180*Math.PI) * 6;
  this.bDY = Math.sin(angle/180*Math.PI) * 6;
  this.hit = false;
  this.offScreen = false;

  this.draw = function() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x+1, this.y+10, this.w, this.h);
  };

  this.update = function() {
    this.y -= this.bDY;
    this.x -= this.bDX;
    this.draw();
  };
}
