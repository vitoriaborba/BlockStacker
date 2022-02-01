class Box {
    constructor (game, x, y, width, color) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 50;

    }
    
    draw() {
        this.game.context.fillStyle = 
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }
}