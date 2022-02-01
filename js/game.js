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
    let allBoxes = this.box[this.currentBox] = {
        x: 0,
        y: (this.currentBox + 10) * this.height,
        width: this.boxes[this.currentBox - 1].width,
      };
    this.boxes.push(allBoxes);
  }

drawBox() {
    for (let n = 0; n < this.boxes.length; n++) {
        this.boxes[n];
        this.context.fillStyle = 'rgb(' + (136 - (n * 10)) + ',' + (192 - (n * 10)) + ',' + ( 218 - (n * 10)) + ')';
        this.context.fillRect(this.box.x, 600 - this.box.y + this.backgroundRoll, this.box.width, this.height);
      }
}

newCutBox() {
    this.cutBox = {
        y: boxes[currentBox].y,
        width: difference
    }
}

drawCutBox () {
    this.context.fillStyle = 'black';
    this.context.fillRect(this.cutBox.x, 600 - this.cutBox.y + this.backgroundRoll, this.cutBox.width, this.height);
}

cutBoxPosition() {
    if (this.boxes[this.currentBox].x > this.boxes[this.currentBox - 1].x) {
      this.boxes[this.currentBox].width = this.boxes[this.currentBox].width - this.difference;
      cutBox.x = this.boxes[this.currentBox].x + this.boxes[this.currentBox].width;
    } else {
      cutBox.x = this.boxes[this.currentBox].x - this.difference;
      this.boxes[this.currentBox].width = this.boxes[this.currentBox].width + this.difference;
      this.boxes[this.currentBox].x = this.boxes[this.currentBox - 1].x;
    }
}
animateCutBox() {
    this.cutBox.y = this.cutBox.y - this.ySpeed;
}


start() {
    let firstBox = this.box = { x: 300, y:300, width:300};
    this.boxes.push(firstBox);
    if (this.mode != 'gameOver') {
        this.uptadeScore();
        this.drawBox();
        this.drawCutBox();

        if (this.mode == 'bounce') {
            this.bounce();
        }
        if (this.mode == 'fall') {
            this.fall();
        }
        this.animateCutBox();
        this.framePosition();
    }
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Space' && this.mode == 'gameOver') {
        restart();
      } else if (event.code === 'Space' && this.mode === 'bounce') {
        this.mode = 'fall';
      }
    });
    window.requestAnimationFrame(this.start);
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

bounceSpeed() {
if (this.xSpeed > 0) {
    this.xSpeed++;
} else {
  this.xSpeed--;
  this.currentBox++;
  this.frames = this.height;
  this.newBox();
    } 
  }
collision() {
    if (this.boxes[this.currentBox].y == this.boxes[this.currentBox - 1].y + this.height) {
        this.mode = 'bounce';
        let difference = this.boxes[this.currentBox].x - this.boxes[this.currentBox - 1].x;
        if (Math.abs(difference) >= this.boxes[this.currentBox].width) {
            this.gameOver();
          }
          this.newCutBox();
          this.cutBoxPosition();
          this.bounceSpeed();
    }
}

fall() {
    this.boxes[this.currentBox].y = this.boxes[this.currentBox].y - this.ySpeed;
    this.collision();
}

framePosition () {
    if (this.frames) {
        this.backgroundRoll++;
        this.frames--;
      }
}

gameOver() {
    this.mode = 'gameOver';
    this.intro.innerHTML = 'Game over. <br> Press to play again!';
}

clear () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

uptadeScore() {
    let score = document.getElementById("score"); 
    score.innerHTML= `Score : ${(this.currentBox - 1)}`
}

restart() {
    this.boxes.splice(1, this.boxes.length - 1);
    this.mode = 'bounce';
    this.backgroundRoll = 0;
    this.frames = 0;
    this.xSpeed = 2;
    this.currentBox = 1;
    this.newBox();
    this.cutBox.y = 0;
    this.intro.innerHTML = '';
  }

uptadeGame () {
    this.restart();
    this.start();
}

}