class Game {
    constructor () {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.background = new Image();
        this.frames = 0;
        this.backgroundY = 0;
        this.currentBlock = 0;
        this.mode = '';
        this.xSpeed = 0;
        this.Yspeed = 5;
        this.height = 50;
        this.blocks = [];
        this.intervalId = null;
    }
    start() {
        this.block = new Block(this, 70, 50, 700, 800);
        this.intervalId = setInterval(() => {
            this.update();
          }, 1000 / 60);
    }
    keyboardEvents() {
        window.addEventListener('keydown', (evento) => {
            if (evento.code === 'Space') {
                
            };
        });
    }
    update() {
        this.drawBackground();
        this.block.draw();
    }
    drawBackground() {
        this.background.src = './images/blue-background.jpg' ;
        this.ctx.drawImage(this.background, this.x, this.y, this.canvasWidth, this.canvasHeight);
      }

    blocks(){

    }

    checkGameOver() {

    }

    stop() {
        clearInterval(this.intervalId);
      }
    
    drawScore() {

      }


}
