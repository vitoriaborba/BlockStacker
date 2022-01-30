/* window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };
  
    function startGame() {
      const game = new Game();
      game.start();
    }
  }; */

  let canvas = document.getElementById("canvas");
  let intro = document.getElementById("intro");
  let score = document.getElementById("score");
  let context = canvas.getContext("2d");

    context.font = 'bold 30px sans-serif';
    // variables and objects.
    let frames, cameraY, current, mode, xSpeed;
    let ySpeed = 8;
    let height = 50;
    let boxes = [];
    boxes[0] = {
      x: 300,
      y: 300,
      width: 300
    };
    let debris = {
      x: 0,
      width: 0
    };
     //The function that create a new box after the previous one falls.
    function newBox() {
      boxes[current] = {
        x: 0,
        y: (current + 10) * height,
        width: boxes[current - 1].width,
      };
    }
     
    function gameOver() {
      mode = 'gameOver';
      intro.innerHTML = 'Game over. <br> Press to play again!';
    }
     
    function animate() {
        //If the game is active:
      if (mode != 'gameOver') {
          //Clear the previous frame and display the score.
        context.clearRect(0, 0, canvas.width, canvas.height);
        score.innerHTML= `Score : ${(current - 1)}`
        //Draw all the boxes.
        for (let n = 0; n < boxes.length; n++) {
          let box = boxes[n];
          context.fillStyle = 'rgb(' + (136 - (n * 10)) + ',' + (192 - (n * 10)) + ',' + ( 218 - (n * 10)) + ')';
          context.fillRect(box.x, 600 - box.y + cameraY, box.width, height);
        
        }
        //Draw the debris.
        context.fillStyle = 'black';
        context.fillRect(debris.x, 600 - debris.y + cameraY, debris.width, height);
        //If the game is in the 'bounce' mode (the current box is bouncing horizontally off the walls):
        if (mode == 'bounce') {
            //Move the current box in the x axis. Reverse the direction if it hits a wall.
          boxes[current].x = boxes[current].x + xSpeed;
          if (xSpeed > 0 && boxes[current].x + boxes[current].width > canvas.width)
            xSpeed = -xSpeed;
          if (xSpeed < 0 && boxes[current].x < 0)
            xSpeed = -xSpeed;
        }
        //If the game is in the 'fall' mode (the current box has been released):
        if (mode == 'fall') {
            //Move the current box in the y axis.
          boxes[current].y = boxes[current].y - ySpeed;
          /* If it lands on top of the previous box:
          Change the mode back to 'bounce'. */
          if (boxes[current].y == boxes[current - 1].y + height) {
            mode = 'bounce';
            // Calculate the length of the non-overlapping part.
            let difference = boxes[current].x - boxes[current - 1].x;
            // If the difference is greater than the box, it means the player missed completely: game over!
            if (Math.abs(difference) >= boxes[current].width) {
              gameOver();
            }
            // Update the debris object.
            debris = {
              y: boxes[current].y,
              width: difference
            };
            //Determine whether the debris should be on the left or the right side of the box.
            if (boxes[current].x > boxes[current - 1].x) {
              boxes[current].width = boxes[current].width - difference;
              debris.x = boxes[current].x + boxes[current].width;
            } else {
              debris.x = boxes[current].x - difference;
              boxes[current].width = boxes[current].width + difference;
              boxes[current].x = boxes[current - 1].x;
            }
            //Increase the bouncing speed.
            if (xSpeed > 0)
              xSpeed++;
            else
              xSpeed--;
            current++;
            frames = height;
            newBox();
          }
        }
        // Animate the debris - it keeps falling until it gets updated again
        debris.y = debris.y - ySpeed;
        /* The frames determines for how many frames the camera should move up. 
        If it's positive, the camera position is updated. */
        if (frames) {
          cameraY++;
          frames--;
        }
      }
      //Wait for the next animation frame
      window.requestAnimationFrame(animate);
    }
     //Function that reassigns initial values to the variables at the beginning of a new game.
    function restart() {
      boxes.splice(1, boxes.length - 1);
      mode = 'bounce';
      cameraY = 0;
      frames = 0;
      xSpeed = 2;
      current = 1;
      newBox();
      debris.y = 0;
      intro.innerHTML = '';
    }
     
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Space' && mode == 'gameOver') {
        restart();
      } else if (event.code === 'Space' && mode === 'bounce') {
        mode = 'fall';
      }
    });

    restart(); //Initialize the first game.

    animate(); //Kick off the animation.

    

