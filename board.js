function addListeners() {
  let pressed = false;

  document.addEventListener('keydown', (e) => {
    if (e.keyCode == 32 && !pressed) {
      if (turret.count >= 10) {
      } else {
        turret.bullets.push(new Bullet(((canvas.width/2) - 5), (canvas.height - tH), 0, 7));
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
  document.getElementById('mute').addEventListener('click', (e) => {
      muted = !muted;
  });
}

function runGame() {
  startShip();
  animateBoard();
  addListeners();
}

function Sounds(maxSize) {
  let size = maxSize;
  let pool = [];
  this.pool = pool;
  let currSound = 0;

  this.init = function() {
    for (let i = 0; i < size; i++) {
      let explosion = new Audio('sounds/explosion.mp3');
      pool.push(explosion);
    }
  };

  this.get = function() {
    if (pool[currSound].currentTime == 0 || pool[currSound].ended) {
      pool[currSound].play();
    }
    currSound = (currSound + 1) % size;
  };
}

let explosion = new Sounds(20);

canvas.addEventListener('mousedown', (e) => {
  e.preventDefault();
  if (e.target.id == 'canvas') {
    explosion.init();
    runGame();
  }
}, {once: true});

function Score(score) {
  this.x = 635;
  this.y = 20;
  this.score = 'Ships Destroyed: ' + score;

  ctx.fillStyle = 'white';
  ctx.font = '15px sans-serif';
  ctx.fillText(this.score, this.x, this.y);
}

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
          if (!muted) {
            explosion.get();
          }
        }
        for (i = 0; i < 16; i++) {
          bulletsToAdd.push(
            new Debris(s.x, s.y, 22.5 * i+1)
          );
        }
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
