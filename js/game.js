
class Game {
constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.intro = document.getElementById("intro");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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
    this.soundStart = new Audio ('/docs/assets/sounds/start.mp3');
    this.soundJump = new Audio ('/docs/assets/sounds/drop.mp3');
    this.soundGameOver = new Audio ('/docs/assets/sounds/game-over.mp3');
    this.soundBounce = new Audio ('/docs/assets/sounds/bounce.mp3');


}

start() {
  this.soundStart.play();
  this.boxes.splice(1, this.boxes.length - 1);
  this.boxes.push({ x: 530, y:300, width:300, height:50});
  this.mode = 'bounce';
  this.backgroundRoll = 0;
  this.frames = 0;
  this.xSpeed = 5;
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
      this.context.shadowBlur = '10';
      this.context.shadowColor = 'rgb(64,224,208)';
      this.context.strokeStyle = 'rgb(64,224,208)';
      //this.context.fillStyle = 'rgb(' + (64 - (n * 8)) + ',' + (224 - (n * 8)) + ',' + ( 208 - (n * 8)) + ')';
      this.context.strokeRect(this.boxes[n].x, 700 - this.boxes[n].y + this.backgroundRoll, this.boxes[n].width, this.height);
      }
}

newCutBox() {
    this.cutBox = {
        y: this.boxes[this.currentBox].y,
        width: this.difference
    }
}

drawCutBox () {
    this.context.fillStyle = 'rgb(221,160,221)';
    this.context.shadowColor = 'rgb(221,160,221)';
    this.context.shadowBlur = '15';
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
    if (this.xSpeed > 0 && this.boxes[this.currentBox].x + this.boxes[this.currentBox].width > this.canvas.width) {
     this.xSpeed = -this.xSpeed;
     this.soundBounce.play();
    }
    if (this.xSpeed < 0 && this.boxes[this.currentBox].x < 0) {
     this.xSpeed = -this.xSpeed;
     this.soundBounce.play();
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
        this.soundJump.play();
        this.mode = 'bounce';
        this.difference = this.boxes[this.currentBox].x - this.boxes[this.currentBox - 1].x;
        if (Math.abs(this.difference) >= this.boxes[this.currentBox].width) {
           this.soundGameOver.play();
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
    this.context.font = '100px Montserrat';
    this.context.shadowColor = 'rgb(153,50,204)'
    this.context.fillStyle = 'whitesmoke';
    this.context.fillText('GAME', 370, 320)
    this.context.shadowColor = 'turquoise'
    this.context.fillText('OVER', 685, 320)
    this.context.font = 'italic 20px Montserrat';
    this.context.shadowBlur = '0';
    this.context.fillText('CLICK TO PLAY AGAIN', 563, 360);

}

clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

uptadeScore() {
    this.context.font = 'italic 20px Montserrat';
    this.context.shadowBlur = '0';
    this.context.fillStyle = 'whitesmoke';
    this.context.fillText(`SCORE : ${(this.currentBox - 1)}`, 618, 80);
    this.context.font = 'italic 13px Montserrat';
    this.context.fillStyle = '#a9a9a9';
    this.context.fillText('PRESS SPACE OR CLICK ON THE SCREEN TO DROP THE BLOCK', 450, 25);

}

restart() {
    this.soundStart.play();
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
