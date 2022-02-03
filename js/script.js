window.addEventListener('load', function() {  
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
 /*  context.font = '15px Montserrat';
  context.shadowBlur = '0';
  context.fillStyle = 'rgb(95,158,160)';
  context.fillText('CLICK on the screen or press SPACE to drop the box', 195, 30);
  context.fillStyle = 'rgb(95,158,160)';
  context.font = '17px Montserrat';
  context.fillText('CLICK HERE & STACK AS MANY AS YOU CAN!', 200, 400);
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
  context.fillText('STACKER', 330, 360); */

  let particleArray = [];
let adjustX = 13;
let adjustY = -18;

 
const mouse = {
    x: null,
    y: null,
    radius: 100
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});
context.fillStyle = 'white';
context.font = '15px Montserrat';
context.fillText('PLAY', 0, 40);


const textCoordinates = context.getImageData(0, 0, 100, 100);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 4;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 40) + 5;
        this.distance;
    }
    draw () {
        context.shadowColor = 'rgb(177, 95, 177)'
        context.shadowBlur = '15';
        context.fillStyle = 'rgb(177, 95, 177)';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / this.distance;
        let forceDirectionY = dy / this.distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - this.distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        
        if (this.distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x != this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            } if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy/10;

      }
     }
    }
}

function init() {
    particleArray = [];
   for (let y = 0, y2 = textCoordinates.height; y < y2; y++){
       for ( let x = 0, x2 = textCoordinates.width; x < x2; x++) {
           if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
               let positionX = x + adjustX;
               let positionY = y + adjustY;
               particleArray.push(new Particle(positionX * 20, positionY * 20));

           }
       }
   }
}
init();
let animateId = null;
function animate(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();

    }
    connect();
    animateId = requestAnimationFrame(animate); 
}
animate();

function connect(){
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++){
    for (let b = a; b < particleArray.length; b++){
      let dx = particleArray[a].x - particleArray[b].x;
      let dy = particleArray[a].y - particleArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      opacityValue = 1 - (distance/50);
      context.shadowBlur = '0';
      context.strokeStyle = 'rgba(64,224,208,' + opacityValue + ')';
      if(distance < 50) {
          context.lineWidth = 2;
          context.beginPath();
          context.moveTo(particleArray[a].x, particleArray[a].y);
          context.lineTo(particleArray[b].x, particleArray[b].y);
          context.stroke();
           }
        }
    }
}


    canvas.onclick = function() {
        cancelAnimationFrame(animateId)
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
   