class CutBox {
    constructor(game, x, y, width) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 50;
    }
    draw () {
        this.game.context.fillStyle = 'black';
        this.game.context.fillRect(cutBox.x, 600 - cutBox.y + backgroundRoll, cutBox.width, this.height);
    }
}