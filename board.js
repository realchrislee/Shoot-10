// let pressed = false;
//
// document.addEventListener('keydown', (e) => {
//   if (e.keyCode == 32 && pressed == false) {
//     // bDX = 2;
//     //limit bullets to 10
//     if (turret.count >= 10) {
//       console.log('No more bullets');
//     } else {
//       turret.bullets.push(new Bullet(((canvas.width/2) - 5), (canvas.height - tH), 0, 6));
//       turret.count++;
//       bulletDisplay.pop();
//     }
//     pressed = true;
//   }
// });
//
// document.addEventListener('keyup', (e) => {
//   if (e.keyCode == 32) {
//     pressed = false;
//   }
// });
//
// document.addEventListener('mousedown', (e) => {
//   e.preventDefault();
//   if (e.target.id == 'canvas') {
//     // bDX = 2;
//     //limit bullets to 10
//     if (turret.count >= 10) {
//       console.log('No more bullets');
//     } else {
//       turret.bullets.push(new Bullet(((canvas.width/2) - 5), (canvas.height - tH), 0, 6));
//       turret.count++;
//       bulletDisplay.pop();
//     }
//   }
// });

function addListeners() {
  let pressed = false;

  document.addEventListener('keydown', (e) => {
    if (e.keyCode == 32 && pressed == false) {
      // bDX = 2;
      //limit bullets to 10
      if (turret.count >= 10) {
        console.log('No more bullets');
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
        console.log('No more bullets');
      } else {
        turret.bullets.push(new Bullet(((canvas.width/2) - 5), (canvas.height - tH), 0, 6));
        turret.count++;
        bulletDisplay.pop();
      }
    }
  });
}

function togglePause() {
  if (paused) {
    paused = false;
  } else {
    paused = true;
  }
}

document.addEventListener('mousedown', (e) => {
  e.preventDefault();
  if (e.target.id == 'canvas') {
    startShip();
    animateBoard();
    addListeners();
  }
}, {once: true});


function landing() {
  background();
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.font = '30px sans-serif';
  ctx.fillText('How many ships can you kill with 10 bullets?', canvas.width/2, 50);
  ctx.fillText('Click to start', canvas.width/2, 120);
  ctx.fillText('Left mouse button / spacebar to shoot', canvas.width/2, 190);
  // ctx.fillText('')
}

landing();

// function Flash() {
//   this.o = 1;
//   this.draw = function() {
//     ctx.fillStyle = `rgba(255,255,255,${o})`;
//     ctx.fillReact(0, 0, canvas.width, canvas.height);
//   };
//
//   this.update = function() {
//     o -= 1;
//   };
// }

function Score(score) {
  this.x = 650;
  this.y = 20;
  this.score = 'Score: ' + score.toString();

  ctx.fillStyle = 'black';
  ctx.font = '15px sans-serif';
  ctx.fillText(this.score, this.x, this.y);
}

function background() {
  let background = new Image();
  background.src = './images/Background2.jpg';
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function removeBullets() {
  bulletsToRemove.forEach(bulletIdx => {
    turret.bullets.splice(bulletIdx, 1);
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
    if (s.hit) {
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
function animateBoard() {
  requestAnimationFrame(animateBoard);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background();
  Score(score);
  bulletDisplay.forEach(bullet => {
    bullet.update();
  });
  turret.draw();
  // console.log(turret.bullets);
  // turret.bullets.forEach(bullet => {
  //
  //   bullet.update();
  // });



  shipArray.forEach((s, i) => {
    for (let j = 0; j < turret.bullets.length; j++) {
      let b = turret.bullets[j];
      if (
        s.x < b.x + b.w &&
        s.x + s.w > b.x &&
        s.y < b.y + b.h &&
        s.h + s.y > b.y &&
        b.x < canvas.width &&
        b.x > 0 &&
        b.y > 0 &&
        b.y < canvas.height &&
        s.hit === false
        // b.hit === false
          ){
            incrementScore();
        if (!bulletsToRemove.includes(j)) {
          // && !shipsToRemove.includes(i)
          bulletsToRemove.push(j);
          // shipsToRemove.push(i);
          s.hit = true;
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
        // Flash.draw();
        // Flash.update();
      }
    }
  });
  turret.clean();
  removeShips();
  removeBullets();
  addBullets();

  shipArray.forEach((s, i) => {
    if (s.x < -10 || s.x > 730) {
      if (shipsToRemove.includes(i)) {
        return;
      } else {
        shipsToRemove.push(i);
      }
    } else {
      s.update();
    }
  });

  removeShips();


  // if (turret.bullets[0] == null && turret.count >= 10) {
  //   alert('Game Over!');
  // }
}

// animateBoard();
