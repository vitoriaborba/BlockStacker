
class Game {
constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.intro = document.getElementById("intro");
    this.frames = null;
    this.backgroundRoll = null;
    this.currentBox = null;
    this.mode = '';
    this.xSpeed = null;
    this.difference = null;
    this.ySpeed = 8;
    this.height = 50;
    this.boxes = [];
    this.cutBox = { x: 0, width: 0}
    this.intervalId = null;
    this.img = new Image ();
}

start() {
  this.boxes.splice(1, this.boxes.length - 1);
  this.boxes.push({ x: 260, y:300, width:300, height:50});
  this.mode = 'bounce';
  this.backgroundRoll = 0;
  this.frames = 0;
  this.xSpeed = 2;
  this.currentBox = 1;
  this.newBox();
  this.cutBox.y = 0;
  this.intro.innerHTML = '';
 this.intervalId = setInterval(()=> {
  this.uptadeGame();
 },1000 /60)
}

newBox() {
  this.boxes.push({
    x: 0,
    y: (this.currentBox + 10) * this.height,
    width: this.boxes[this.currentBox - 1].width,
  });
  }

drawBox() {
    for (let n = 0; n < this.boxes.length; n++) {
      this.img.src= '.images/middle.png'
      this.context.fillStyle = 'rgb(' + (1 + (n * 3)) + ',' + (56 + (n * 3)) + ',' + ( 53 + (n * 3)) + ')';
        this.context.fillRect(this.boxes[n].x, 700 - this.boxes[n].y + this.backgroundRoll, this.boxes[n].width, this.height);
      }
}

newCutBox() {
    this.cutBox = {
        y: this.boxes[this.currentBox].y,
        width: this.difference
    }
}

drawCutBox () {
    this.context.fillStyle = 'rgb(59, 59, 59)';
    this.context.fillRect(this.cutBox.x, 700 - this.cutBox.y + this.backgroundRoll, this.cutBox.width, this.height);
}

cutBoxPosition() {
    if (this.boxes[this.currentBox].x > this.boxes[this.currentBox - 1].x) {
      this.boxes[this.currentBox].width = this.boxes[this.currentBox].width - this.difference;
      this.cutBox.x = this.boxes[this.currentBox].x + this.boxes[this.currentBox].width;
    } else {
      this.cutBox.x = this.boxes[this.currentBox].x - this.difference;
      this.boxes[this.currentBox].width = this.boxes[this.currentBox].width + this.difference;
      this.boxes[this.currentBox].x = this.boxes[this.currentBox - 1].x;
    }
}
animateCutBox() {
    this.cutBox.y = this.cutBox.y - this.ySpeed;
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
    this.currentBox++;
    this.frames = this.height;
    this.newBox();
} else {
  this.xSpeed--;
  this.currentBox++;
  this.frames = this.height;
  this.newBox();
    } 
  }
  
collision() {
    if (this.boxes[this.currentBox].y === this.boxes[this.currentBox - 1].y + this.height) {
      
    console.log('collided');
        this.mode = 'bounce';
        this.difference = this.boxes[this.currentBox].x - this.boxes[this.currentBox - 1].x;
        if (Math.abs(this.difference) >= this.boxes[this.currentBox].width) {
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

framePosition() {
    if (this.frames) {
        this.backgroundRoll++;
        this.frames--;
      }
}

gameOver() {
    this.mode = 'gameOver';
    this.context.font = '60px Montserrat';
    this.context.fillStyle = 'whitesmoke';
    this.context.fillText('GAME OVER', 215, 320)
    this.context.font = '20px Montserrat';
    this.context.fillText('Click to play again', 310, 355);

}

clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

uptadeScore() {
    let score = document.getElementById("score"); 
    this.context.font = '20px Montserrat';
    this.context.fillStyle = 'whitesmoke';
    this.context.fillText(`SCORE : ${(this.currentBox - 1)}`, 335, 80);
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

uptadeGame() {
    if (this.mode != 'gameOver') {
      this.clear();
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
}

}

window.addEventListener('load', function() {  
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  context.font = '50px Montserrat';
  context.fillStyle = 'whitesmoke';
  context.fillText('CLICK', 310, 300);
  context.fillText('TO START', 268, 360);
  
  
  canvas.onclick = function() {
    const game = new Game(); 
    game.start();
    game.canvas.onclick = function() {
        if (game.mode == 'gameOver')
        game.restart();
      else {
        if (game.mode == 'bounce')
          game.mode = 'fall';
      }
    }
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Space' && game.mode == 'gameOver') {
        game.restart();
      } else if (event.code === 'Space' && game.mode === 'bounce') {
        game.mode = 'fall';
      }
    });
  }
});
   