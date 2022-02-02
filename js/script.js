window.addEventListener('load', function() {  
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  context.font = '15px Montserrat';
  context.shadowBlur = '0';
  context.fillStyle = 'rgb(95,158,160)';
  context.fillText('CLICK on the screen or press SPACE to drop the box', 195, 30);
  context.fillStyle = 'whitesmoke';
  context.font = '17px Montserrat';
  context.fillText('CLICK HERE & STACK AS MANY AS YOU CAN!', 196, 400);
  context.fillStyle = 'black';
  context.shadowColor = 'white';
  context.shadowBlur = '20';
  context.fillRect(199, 309, 377, 70);
  context.fillStyle = 'whitesmoke';
  context.font = '50px Montserrat';
  context.shadowColor = 'rgb(153,50,204)';
  context.shadowBlur = '15';
  context.fillText('BOX', 210, 360);
  context.shadowColor = 'turquoise';
  context.fillText('STACKER', 330, 360);
 

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
   