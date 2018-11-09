# Shoot10

[Shoot10 live](https://realchrislee.github.io/Shoot10/)

![gif](assets/shoot.gif)

## Background

Shoot10 is a game based on 10 bullets. The user shoots ships and they explode causing debris to hit other ships into a chain reaction. It was written in JavaScript and uses Canvas for 2D rendering.

## How to Play

Press the spacebar to shoot and try to get a chain reaction going for as long as you can! Your score is on the top right and the top left shows you how many bullets you have left.

## Features

### 2D Rendering

All 2D rendering is done with HTML 5 Canvas. By looking at the positions of  the Canvas elements, I was able to detect all collisions between the ships and bullets/debris.

```JavaScript
function checkCollision() {
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
          if (!music.muted) {
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
}
```

### Calculating circular debris pattern

In order to ensure an even spread of bullets, I use trigonometry to determine the angles it takes for each bullet's trajectory, then calculate the x and y-velocity based on the calculated time and the distance I want the bullet to travel.

```JavaScript
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
```
