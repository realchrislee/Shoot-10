const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
console.log(canvas.width);
console.log(canvas.height);

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
    let turret = new Image();
    turret.src = './images/turret.png';

    ctx.drawImage(turret, this.x, this.y, this.w, this.h);
  };

  this.update = function() {
    this.draw();
  };

  this.clean = function() {
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].y < 0 || this.bullets[i].y > canvas.height || this.bullets[i].x < 0 || this.bullets[i].x > canvas.width) {
        // if (bulletsToRemove.includes(i)) {
        //   continue;
        // } else {
        //   bulletsToRemove.push(i);
        // }
        this.bullets[i].offScreen = true;
      }
      if (this.bullets[0] != null) {
        this.bullets[i].update();
      }
    }
  };
}
