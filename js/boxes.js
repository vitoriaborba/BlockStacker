class Box {
    constructor (game, x, y, width) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 50;
    }
    
     draw() {
        context.fillStyle = 'rgb(136, 192,218 )';
        context.fillRect(box.x, 600 - box.y + backgroundRoll, box.width, height);
     }
}