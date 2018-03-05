function addListeners() {
  let pressed = false;

  document.addEventListener('keydown', (e) => {
    if (e.keyCode == 32 && pressed == false) {
      // bDX = 2;
      //limit bullets to 10
      if (turret.count >= 10) {
      } else {
        turret.bullets.push(new Bullet(((canvas.width/2) - 5), (canvas.height - tH), 0, 6));
        turret.count++;
        bulletDisplay.pop();
      }
      pressed = true;
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.keyCode == 32) {
      pressed = false;
    }
  });

  document.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (e.target.id == 'canvas') {
      // bDX = 2;
      //limit bullets to 10
      if (turret.count >= 10) {
      } else {
        turret.bullets.push(new Bullet(((canvas.width/2) - 5), (canvas.height - tH), 0, 6));
        turret.count++;
        bulletDisplay.pop();
      }
    }
  });
}

document.addEventListener('mousedown', (e) => {
  e.preventDefault();
  if (e.target.id == 'canvas') {
    startShip();
    animateBoard();
    addListeners();
  }
}, {once: true});

function Score(score) {
  this.x = 650;
  this.y = 20;
  this.score = 'Score: ' + score;

  ctx.fillStyle = 'black';
  ctx.font = '15px sans-serif';
  ctx.fillText(this.score, this.x, this.y);
}

// function landing() {
//   ctx.fillStyle = 'black';
//   ctx.textAlign = 'center';
//   ctx.font = '30px sans-serif';
//   ctx.fillText('How many ships can you kill with 10 bullets?', canvas.width/2, 50);
//   ctx.fillText('Click to start', canvas.width/2, 120);
//   ctx.fillText('Left click / spacebar to shoot', canvas.width/2, 190);
//   ctx.fillStyle = 'blue';
//   ctx.fillRect(0, 0, canvas.width,canvas.heigth);
// }
//
// landing();

function removeBullets() {
  turret.bullets.forEach((b, i) => {
    if (b.offScreen || b.hit) {
      turret.bullets.splice(i, 1);
      i--;
    }
  });


  bulletsToRemove = [];
}

function addBullets() {
  bulletsToAdd.forEach(bullet => {
    turret.bullets.push(bullet);
  });

  bulletsToAdd = [];
}

function removeShips() {
  // shipsToRemove.forEach(shipIdx => {
  //   shipArray.splice(shipIdx, 1);
  // });

  shipArray.forEach((s, i) => {
    if (s.hit || s.offScreen) {
      shipArray.splice(i, 1);
      i--;
    }
  });

  shipsToRemove = [];
}

function incrementScore() {
  score++;
}

const turret = new Turret(tH);

let score = 0;

let isPaused = false;



function animateBoard() {
  frame = requestAnimationFrame(animateBoard);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background();
  Score(score);
  bulletDisplay.forEach(bullet => {
    bullet.update();
  });
  turret.draw();



  shipArray.forEach((s, i) => {
    for (let j = 0; j < turret.bullets.length; j++) {
      let b = turret.bullets[j];
      if (
        s.x < b.x + b.w &&
        s.x + s.w > b.x &&
        s.y < b.y + b.h &&
        s.h + s.y > b.y &&
        b.x < canvas.width + 10 &&
        b.x > -20 &&
        b.y > -20 &&
        b.y < canvas.height + 10 &&
        s.hit === false &&
        b.hit === false
          ){
            incrementScore();
        if (!bulletsToRemove.includes(j) && !b.hit) {
          s.hit = true;
          b.hit = true;
        }
        bulletsToAdd.push(
          new Bullet(s.x, s.y, 5),
          new Bullet(s.x, s.y, -5),
          new Bullet(s.x, s.y, 0, 5),
          new Bullet(s.x, s.y, 0, -5),
          new Bullet(s.x, s.y, 2, 2),
          new Bullet(s.x, s.y, -2, -2),
          new Bullet(s.x, s.y, 2, -2),
          new Bullet(s.x, s.y, -2, 2),
          new Bullet(s.x, s.y, 1, 4),
          new Bullet(s.x, s.y, -1, 4),
          new Bullet(s.x, s.y, 1, -4),
          new Bullet(s.x, s.y, -1, -4),
          new Bullet(s.x, s.y, 4, 1),
          new Bullet(s.x, s.y, 4, -1),
          new Bullet(s.x, s.y, -4, -1),
          new Bullet(s.x, s.y, -4, 1)
        );
      }
    }
  });
  turret.clean();
  removeShips();
  removeBullets();
  addBullets();

  shipArray.forEach((s, i) => {
    if (s.x < -20 || s.x > canvas.width + 10) {
      s.offScreen = true;
    } else {
      s.update();
    }
  });

  removeShips();

  if (turret.bullets.length === 0 && turret.count >= 10) {
    console.log('hit');
    cancelAnimationFrame(frame);
    document.location.reload();
    alert('Game Over! \nYour score: ' + score);
    return;
  }
}

// animateBoard();
