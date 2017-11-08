# Shoot-10

Shoot-10 is a game based on [10 bullets](http://www.kongregate.com/games/sushistory/10-bullets). The user shoots ships and they explode causing debris to hit other ships into a chain reaction. 

## MVPs
  * User can click the left mouse button or spacebar to shoot a bullet straight into the air from the middle of the screen.
  * Ships move in from both the left and right at varying intervals and heights
  * When user's bullet hits a ship; ship explodes first with two horizontal debris adding more with each consecutive ship hit by debris
  * Count how many successive hits have been made until 25
  * Angle of debris rotation changes after a certain number
  * Point system
  * High score system
 
## Technlogies, Libraries, APIs

The backend of the game will be built with JavaScript and the frontend will be rendered using the Easel.JS API to render the ships and debris.

## Wireframes 

![wireframe](https://github.com/realchrislee/Shoot-10/blob/master/Shoot-10%20Wireframe.jpg)

## Implementation Timeline

**Day 1:** Get Easel.js running as well as webpack. Learn the basics of Easel.js and find sprites. Goals for the day:
 * Learn enough Easel.js to render an object 
 * Setup the title and box for the main game.
 * Create turret.js, board.js, ship.js
 
**Day 2:** Use this day to set up the game start state. Goals for the day: 
 * Complete turret.js and board.js
 * Render a rectangle on the bottom with the user's turret in the middle pointing straight up
 * Create 5 rows for the ships giving space between the user turret and the bottom most row
 * Display 10 bullets on the upper left of the box
 
**Day 3:** Create logic for debris initial and addition of debris to ring. Goals for the day:
 * Figure out how to keep track of the debris
 * Rotate the debris as more are added
 * Create ships at random intervals from left and right
**Day 4:** Style the frontend and complete code to be bug-free. Goals for the day:
 * Have a styled title and score
 * Tie up any loose ends
