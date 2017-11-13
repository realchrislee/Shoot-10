const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let bulletsToRemove = [];
let shipsToRemove = [];
let bulletsToAdd = [];

//turret params
const tH = 70;

function Turret(tH, tW) {
  this.w = 80;
  this.h = tH;
  this.x = (canvas.width/2) - (this.w/2);
  this.y = (canvas.height - this.h);
  this.bullets = [];
  this.count = 0;

  //turret
  this.draw = function() {
    // ctx.fillStyle = '#000';
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    let turret = new Image();
    turret.src = './images/turret.png';

    ctx.drawImage(turret, this.x, this.y, this.w, this.h);
  };

  this.update = function() {
    // for (let i = 0; i < this.bullets.length; i++) {
    //   if (this.bullets[0] != null) {
    //     this.bullets[i].update();
    //   }
    //   if (this.bullets[i].y < 0 || this.bullets[i].y > 320 || this.bullets[i].x < 0 || this.bullets[i].x > 720) {
    //     // this.bullets.splice(i, 1);
    //     if (bulletsToRemove.includes(i)) {
    //       continue;
    //     } else {
    //       bulletsToRemove.push(i);
    //     }
    //   }
    // }
    this.draw();
  };

  // this.hitDetect = function(s, si) {
  //   for (let i = 0; i < this.bullets.length; i++) {
  //     var b = this.bullets[i];
  //   }
  // };
}


//bullet params
function Bullet(x, y, bDX = 0, bDY = 0) {
  this.x = x;
  this.y = y;
  this.w = 12;
  this.h = 10;
  this.bDX = bDX;
  this.bDY = bDY;

  // bullet
  this.draw = function() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  this.update = function() {
    this.y -= bDY;
    this.x -= bDX;
    this.draw();
  };
}

function BulletDisplay() {
}
