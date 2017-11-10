let pressed = false;

let bulletDisplay = [
  new Bullet(15, 10),
  new Bullet(30, 10),
  new Bullet(45, 10),
  new Bullet(60, 10),
  new Bullet(75, 10),
  new Bullet(90, 10),
  new Bullet(105, 10),
  new Bullet(120, 10),
  new Bullet(135, 10),
  new Bullet(150, 10),
];

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 32 && pressed == false) {
    bDX = 2;
    //limit bullets to 10
    // if (turret.count >= 10) {
    //   console.log('No more bullets');
    // } else {
      turret.bullets.push(new Bullet(((canvas.width/2) - 5), (canvas.height - tH), 0, 6));
      turret.count++;
      bulletDisplay.pop();
    // }
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
    bDX = 2;
    //limit bullets to 10
    // if (turret.count >= 10) {
    //   console.log('No more bullets');
    // } else {
      turret.bullets.push(new Bullet(((canvas.width/2) - 5), (canvas.height - tH), 0, 6));
      turret.count++;
      bulletDisplay.pop();
    // }
  }
});


const turret = new Turret(tH);

function animateBoard() {
  requestAnimationFrame(animateBoard);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  turret.update();

  bulletDisplay.forEach(bullet => {
    bullet.update();
  });

  shipArray.forEach((s, i) => {
    for (let j = 0; j < turret.bullets.length; j++) {
      let b = turret.bullets[j];
      if (b.x+b.w >= s.x && b.x <= s.x+s.w && b.y >= s.y && b.y <= s.y+s.h) {
        turret.bullets.splice(j, 1);
        shipArray.splice(i, 1);
      }
    }
  });

  shipArray.forEach((s, i) => {
    if (s.x < -20 || s.x > 740) {
      shipArray.splice(i, 1);
    } else {
      s.update();
    }
  });


  // if (turret.bullets[0] == null && turret.count >= 10) {
  //   alert('Game Over!');
  // }
}

animateBoard();
