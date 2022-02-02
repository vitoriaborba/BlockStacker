window.addEventListener('load', function() {  
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  context.font = '15px Montserrat';
  context.shadowBlur = '0';
  context.fillStyle = 'rgb(221,160,221)';
  context.fillText('CLICK ON THE SCREEN OR PRESS SPACE-BAR TO DROP THE BOX', 135, 620);
  context.fillStyle = 'whitesmoke';
  context.font = '18px Montserrat';
  context.fillText('STACK AS MANY BOXES AS POSSIBLE', 205, 80);
  context.font = '50px Montserrat';
  context.fillStyle = 'whitesmoke';
  context.shadowColor = 'purple'
  context.shadowBlur = '15'
  context.fillText('CLICK', 305, 315);
  context.fillText('TO START', 263, 385);
  
  
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
   