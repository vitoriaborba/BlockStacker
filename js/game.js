class Game {
    constructor () {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.intro = document.getElementById("intro");
        this.frames = null;
        this.backgroundRoll = null;
        this.currentBox = null;
        this.mode = ' ';
        this.xSpeed = null;
        this.difference = null;
        this.ySpeed = 8;
        this.height = 50;
        this.boxes = [];
        this.cutBox = { x: 0, width: 0}
    }
    /* newcutBox() {
      new CutBox (this, this.cutBox.x, this.boxes[this.currentBox].y, this.difference, this.height);
    }
 */
    newBox() {
      this.boxes.push(new Box(this, 0, ((this.currentBox + 10) * this.height) ,(this.boxes[this.currentBox - 1].width))); 
    }

    start() {
      this.animateGame();
      this.control();
    }  

    restart() {
      this.boxes.splice(1, this.boxes.length - 1);
      this.mode = 'bounce';
      this.backgroundRoll = 0;
      this.frames = 0;
      this.xSpeed = 2;
      this.currentBox = 1;
      this.boxes = [];
      this.cutBox.y = 0;
      this.intro.innerHTML = '';
      this.start();
    }
   
    control() {
      window.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && this.mode == 'gameOver') {
          restart();
        } else if (event.code === 'Space' && this.mode === 'bounce') {
          this.mode = 'fall';
        }
      });
    }

    animateGame() {
      console.log(this)
        this.clear();
        this.uptadeScore();
        for (let i = 0; i < this.boxes.length; i++) {
          let box = this.boxes[i];
          if (this.boxes.length === 0) {
            this.boxes.push(new Box(this, 300, 300, 300));
          } else {
            this.boxes.push(new Box(this, box.x, 600 - box.y + this.backgroundRoll, box.width, this.height))
          };
          this.boxes[i].draw();
          this.newcutBox.draw();
        };
        if (this.mode == 'bounce') {
          this.bounce();
        };
        if (this.mode == 'fall') {
          this.fall();
        };
        /* if (this.boxes[this.currentBox].x > this.boxes[this.currentBox - 1].x) {
          this.boxes[this.currentBox].width = this.boxes[this.currentBox].width - this.difference;
          cutBox.x = this.boxes[this.currentBox].x + this.boxes[this.currentBox].width;
        } else {
          cutBox.x = this.boxes[this.currentBox].x - this.difference;
          this.boxes[this.currentBox].width = this.boxes[this.currentBox].width + this.difference;
          this.boxes[this.currentBox].x = this.boxes[this.currentBox - 1].x;
        } */
        if (this.frames) {
          this.backgroundRoll++;
          this.frames--;
        };
      
       window.requestAnimationFrame(this.animateGame);
     }

     bounce() {
       this.boxes[this.currentBox].x = this.boxes[this.currentBox].x + this.xSpeed;
       if (this.xSpeed > 0 && this.boxes[this.currentBox].x + this.boxes[this.currentBox].width > canvas.width) {
        this.xSpeed = -this.xSpeed;
       }
       if (this.xSpeed < 0 && this.boxes[this.currentBox].x < 0) {
        this.xSpeed = -this.xSpeed;
       }
     }
     fall() {
       this.boxes[this.currentBox].y = this.boxes[this.currentBox].y - this.ySpeed;

       if (this.boxes[this.currentBox].y == this.boxes[this.currentBox - 1].y + height) {
        this.mode = 'bounce';
       
        let difference = this.boxes[this.currentBox].x - this.boxes[this.currentBox - 1].x;
       
        if (Math.abs(difference) >= this.boxes[this.currentBox].width) {
          gameOver();
          this.newcutBox();
        }
        if (this.xSpeed > 0) {
          this.xSpeed++;
        } else {
          this.xSpeed--;
          this.currentBox++;
          this.frames = this.height;
          this.newBox();
         }   
       }
     
      clear () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }

      uptadeScore() {
        let score = document.getElementById("score"); 
        score.innerHTML= `Score : ${(this.currentBox - 1)}`
      }

    gameOver() {
      this.mode = 'gameOver';
      this.intro.innerHTML = 'Game over. <br> Press to play again!';
    }

  }
     
  let game = new Game();
  console.log(game.mode)
  game.start();
