function Ship(x, tX, y, dX) {
  this.x = x;
  this.tX = tX;
  this.y = y;
  this.dX = dX;
  this.w = 35;
  this.h = 30;

  this.draw = function() {
    ctx.fillStyle = 'blue';
    // ctx.beginPath();
    // ctx.moveTo(this.x, this.y + 10);
    // ctx.lineTo(this.x + this.tX, this.y + 15);
    // ctx.lineTo(this.x + this.tX, this.y - 15);
    // ctx.lineTo(this.x, this.y - 10);
    // ctx.fill();

    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  this.update = function() {
    this.x -= this.dX;
    this.draw();
  };
}


let shipArray = [];

function generateShip() {
  let faceSet = [740, -20];
  let tailSet = [35, -35];
  let shipNum = Math.round(Math.random());
  let frontX = faceSet[shipNum];
  let tailX = tailSet[shipNum];
  let ySet = [50, 80, 110, 140, 170];
  let rY = ySet[Math.floor(Math.random() * 5)];
  let dXSet = [1.2, -1.2];
  let dX = dXSet[shipNum];
  let ship = new Ship(frontX, tailX, rY, dX);
  return ship;
}

setInterval(() => {
  shipArray.push(generateShip());
}, 500);
console.log(shipArray);

// function animateShip() {
//   requestAnimationFrame(animateShip);
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   animateTurret();
//   animateBullet();
//
//   shipArray.forEach(ship => ship.update());
// }
