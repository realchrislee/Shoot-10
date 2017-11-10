let pressed = false;

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 32 && pressed == false) {
    bDX = 2;
    //limit bullets to 10
    // if (turret.count >= 10) {
    //   console.log('No more bullets');
    // } else {
      turret.bullets.push(new Bullet(6));
      turret.count++;
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
      turret.bullets.push(new Bullet(6));
      turret.count++;
    // }
  }
});


const turret = new Turret(tH);

function animateBoard() {
  requestAnimationFrame(animateBoard);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  turret.update();

  shipArray.forEach((s, i) => {
    for (let j = 0; j < turret.bullets.length; j++) {
      let b = turret.bullets[j];
      if (b.x+b.w >= s.x && b.x <= s.x+s.w && b.y >= s.y && b.y <= s.y+s.h) {
        turret.bullets.splice(j, 1);
        shipArray.splice(i, 1);
        console.log('hit');
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
