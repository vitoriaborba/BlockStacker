window.onload = () => {
      const game = new Game();
      game.start();
}

class Game {
    constructor() {
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
        this.box = {
            x: null,
            y: null,
            width: null,
            height: this.height,
        }
    }

   newBox() {
        let allBoxes = this.box = {
            x: 0,
            y: (this.currentBox + 10) * this.height,
            width: this.boxes[this.currentBox - 1].width,
          };
        this.boxes[this.currentBox].push(allBoxes);
      }

    start() {
        let firstBox = this.box = { x: 300, y:300, width:300};
        this.boxes.push(firstBox);
        for (let n = 0; n < this.boxes.length; n++) {
            let box = this.boxes[n];
            this.context.fillStyle = 'rgb(' + (136 - (n * 10)) + ',' + (192 - (n * 10)) + ',' + ( 218 - (n * 10)) + ')';
            this.context.fillRect(this.box.x, 600 - this.box.y + this.backgroundRoll, this.box.width, this.height);
          }
        if (this.mode != 'gameOver') {
            this.score();

            if (this.mode == 'bounce') {
                this.bounce();
            }
            if (mode == 'fall') {
                
            }
        }
        
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

   gameOver() {
        this.mode = 'gameOver';
        this.intro.innerHTML = 'Game over. <br> Press to play again!';
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

    clear () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    uptadeScore() {
        let score = document.getElementById("score"); 
        score.innerHTML= `Score : ${(this.currentBox - 1)}`
    }

}