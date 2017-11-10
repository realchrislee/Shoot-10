const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//turret params
const tH = 50;

function Turret(tH) {
  this.tW = 50;
  this.tH = tH;
  this.tX = (canvas.width/2) - (this.tW/2);
  this.tY = (canvas.height - this.tH);
  this.bullets = [];
  this.count = 0;

  //turret
  this.draw = function() {
    ctx.fillStyle = '#000';
    ctx.fillRect(this.tX, this.tY, this.tW, this.tH);
  };

  this.update = function() {
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[0] != null) {
        this.bullets[i].update();
      }
      if (this.bullets[i].y < 0) {
        this.bullets.splice(i, 1);
      }
    }
    this.draw();
  };

  this.hitDetect = function(s, si) {
    for (let i = 0; i < this.bullets.length; i++) {
      var b = this.bullets[i];
    }
  };
}


//bullet params
function Bullet(bDY = 0) {
  this.x = (canvas.width/2) - 5;
  this.y = canvas.height - tH;
  this.w = 13;
  this.h = 10;
  this.bDY = bDY;

  // bullet
  this.draw = function() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  this.update = function() {
    this.y -= bDY;
    this.draw();
  };
}

function BulletDisplay() {
}
