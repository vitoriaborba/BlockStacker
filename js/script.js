
  let canvas = document.getElementById("canvas");
  let intro = document.getElementById("intro");
  let score = document.getElementById("score");
  let context = canvas.getContext("2d");

    // variables and objects.
    let frames = 0;
    let backgroundRoll = 0;
    let currentBox = 0;
    let mode = null;
    let xSpeed = 0;
    let ySpeed = 8;
    let height = 50;
    let boxes = [];
    let cutBox = {
      x: 0,
      width: 0
    };
//Fixed box
    boxes[0] = {
      x: 300,
      y: 300,
      width: 300
    };
     //The function that create a new box after the previous one falls.
    function newBox() {
      boxes[currentBox] = {
        x: 0,
        y: (currentBox + 10) * height,
        width: boxes[currentBox - 1].width,
      };
    }
     
    function gameOver() {
      mode = 'gameOver';
      intro.innerHTML = 'Game over. <br> Press to play again!';
    }
     
    function gameStart() {
        //If the game is active:
      if (mode != 'gameOver') {
          //Clear the previous frame and display the score.
        context.clearRect(0, 0, canvas.width, canvas.height);
        score.innerHTML= `Score : ${(currentBox - 1)}`
        //Draw all the boxes.
        for (let n = 0; n < boxes.length; n++) {
          let box = boxes[n];
          context.fillStyle = 'rgb(' + (136 - (n * 10)) + ',' + (192 - (n * 10)) + ',' + ( 218 - (n * 10)) + ')';
          context.fillRect(box.x, 600 - box.y + backgroundRoll, box.width, height);
        
        }
        //Draw the cutBox.
        context.fillStyle = 'black';
        context.fillRect(cutBox.x, 600 - cutBox.y + backgroundRoll, cutBox.width, height);
        //If the game is in the 'bounce' mode (the currentBox box is bouncing horizontally off the walls):
        if (mode == 'bounce') {
            //Move the currentBox box in the x axis. Reverse the direction if it hits a wall.
          boxes[currentBox].x = boxes[currentBox].x + xSpeed;
          if (xSpeed > 0 && boxes[currentBox].x + boxes[currentBox].width > canvas.width)
            xSpeed = -xSpeed;
          if (xSpeed < 0 && boxes[currentBox].x < 0)
            xSpeed = -xSpeed;
        }
        //If the game is in the 'fall' mode (the currentBox box has been released):
        if (mode == 'fall') {
            //Move the currentBox box in the y axis.
          boxes[currentBox].y = boxes[currentBox].y - ySpeed;
          /* If it lands on top of the previous box:
          Change the mode back to 'bounce'. */
          if (boxes[currentBox].y == boxes[currentBox - 1].y + height) {
            mode = 'bounce';
            // Calculate the length of the non-overlapping part.
            let difference = boxes[currentBox].x - boxes[currentBox - 1].x;
            // If the difference is greater than the box, it means the player missed completely: game over!
            if (Math.abs(difference) >= boxes[currentBox].width) {
              gameOver();
            }
            // Update the cutBox object.
            cutBox = {
              y: boxes[currentBox].y,
              width: difference
            };
            //Determine whether the cutBox should be on the left or the right side of the box.
            if (boxes[currentBox].x > boxes[currentBox - 1].x) {
              boxes[currentBox].width = boxes[currentBox].width - difference;
              cutBox.x = boxes[currentBox].x + boxes[currentBox].width;
            } else {
              cutBox.x = boxes[currentBox].x - difference;
              boxes[currentBox].width = boxes[currentBox].width + difference;
              boxes[currentBox].x = boxes[currentBox - 1].x;
            }
            //Increase the bouncing speed.
            if (xSpeed > 0)
              xSpeed++;
            else
              xSpeed--;
            currentBox++;
            frames = height;
            newBox();
          }
        }
        // Animate the cutBox - it keeps falling until it gets updated again
        cutBox.y = cutBox.y - ySpeed;
        /* The frames determines for how many frames the camera should move up. 
        If it's positive, the camera position is updated. */
        if (frames) {
          backgroundRoll++;
          frames--;
        }
      }
      //Wait for the next animation frame
      window.requestAnimationFrame(gameStart);
    }
     //Function that reassigns initial values to the variables at the beginning of a new game.
    function restart() {
      boxes.splice(1, boxes.length - 1);
      mode = 'bounce';
      backgroundRoll = 0;
      frames = 0;
      xSpeed = 2;
      currentBox = 1;
      newBox();
      cutBox.y = 0;
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

    gameStart(); //Start the animation.

    

