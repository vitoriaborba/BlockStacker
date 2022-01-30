class Block {
    constructor (game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.block = new Image();
    }
    draw() {
        
        if (this.game.frame) {
            this.block.src = './images/bottom.png';
        this.game.ctx.drawImage(this.block, this.x, this.y, this.width, this.height);
        } else if (this.game.frame >= 1)  {
         this.block.src = './images/middle.png';
        this.game.ctx.drawImage(this.block, this.x, this.y, this.width, this.height);
        } else if (this.game.frame === 10 ) {
            this.block.src = './images/top.png';
        this.game.ctx.drawImage(this.block, this.x, this.y, this.width, this.height);
        }
        

    }
   
}