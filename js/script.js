window.addEventListener('load', function() {  
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  context.font = '15px Montserrat';
  context.shadowBlur = '0';
  context.fillStyle = 'turquoise';
  context.fillText('Click on the screen or press space-bar to drop the box', 180, 60);
  context.fillStyle = 'whitesmoke';
  context.fillText('STACK AS MANY BOXES AS YOU CAN!', 240, 90);
  context.fillStyle = 'black';
  context.shadowColor = 'white';
  context.shadowBlur = '20';
  context.fillRect(210, 309, 355, 70);
  context.fillStyle = 'whitesmoke';
  context.font = '50px Montserrat';
  context.shadowColor = 'rgb(153,50,204)';
  context.shadowBlur = '15';
  context.fillText('CLICK', 230, 360);
  context.shadowColor = 'turquoise';
  context.fillText('HERE', 395, 360);
 

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
   