const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let currentScore = 0;
let gravity = 1.5;
let copterX = 80;
let copterY = canvas.height/2-50;
let message = document.getElementById('message');
const retryButton = document.getElementById('retry-button');

const upSound = new Audio();
const copter = new Image();
const bg = new Image();
const fg = new Image();
const gitEnemy = new Image();
const filterEnemy = new Image();
const crashSound = new Audio();


copter.src = './images/copter.png';
bg.src = './images/copter-bg.png';
fg.src = './images/deck.png';
gitEnemy.src = './images/gitEnemy.png';
filterEnemy.src = './images/filterEnemy.png';
upSound.src = './images/up.wav';
crashSound.src = './images/crash.wav'

const moveUp = () => {
    upSound.play();
    copterY -= 50;
};

const resetGame = () => { 
    location.reload();
}

retryButton.addEventListener('click', resetGame);
document.addEventListener('mouseup', moveUp);

console.log('copter height', copter.height);
console.log('fg height', fg.height);
console.log('canvas height', canvas.height);
console.log('copterY', copterY);


const enemyTypes = [filterEnemy, gitEnemy];

let enemies = [];

enemies[0] = {
    type: enemyTypes[Math.floor(Math.random() * 2)],
    x: canvas.width,
    y: canvas.height/2-50,
};


function draw() {
    const copterFront = copterX + copter.width-20;
    const copterBottom = copterY + copter.height-30;
    const copterTop = copterY + 30;
    context.drawImage(bg, 0, 0);
    context.drawImage(fg, 0, canvas.height - fg.height);
    context.drawImage(copter, copterX, copterY);
    context.fillStyle = '#FFF';
    context.font = '20px monospace';
    context.fillText('Score: '+ currentScore, 10, canvas.height - 20);

    copterY += gravity;


    for(let i = 0; i < enemies.length; i++) {
        context.drawImage(enemies[i].type, enemies[i].x, enemies[i].y)
        enemies[i].x -= 2
        if(enemies[i].x === 400) {
            enemies.push({
                type: enemyTypes[Math.floor(Math.random() * 2)], 
                x: canvas.width,
                y: Math.floor(Math.random()*canvas.height)
            })
        };

        if(enemies[i].x === copterX - enemies[i].type.width) {
            currentScore++
        }

        // Raise score

        // Collision detection
        if(copterX < (enemies[i].x + enemies[i].type.width) && copterFront > enemies[i].x && copterTop < enemies[i].y + enemies[i].type.height && copterBottom > enemies[i].y || ((copterBottom >= canvas.height) || (copterTop <= 0))){
            crashSound.play()
            console.log('colliding...')
            gravity = 0;
            enemies = [];
            message.style.display = 'block';
            document.removeEventListener('mouseup', moveUp);
            copter.src = './images/copter-crash.png';
        };


    }


    requestAnimationFrame(draw);
    
};

draw();

