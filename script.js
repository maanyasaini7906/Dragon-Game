let score = 0;
let cross = true;

let audiongo = new Audio('gameover.mp3');
let audio = new Audio('music.mp3');
setTimeout(() => {
    audio.play();

},1000);

// KEY CONTROLS
document.onkeydown = function (e) {
    audio.play();

    let dino = document.querySelector('.dino');

    // JUMP (UP ARROW)
    if (e.key === "ArrowUp") {
        dino.classList.add('animateDino');

        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    //MOVE RIGHT
    if (e.key === "ArrowRight") {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 100) + "px";
    }

    // MOVE LEFT
    if (e.key === "ArrowLeft") {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 100) + "px";
    }
};


// GAME LOOP (COLLISION + SCORE)
setInterval(() => {

    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    //Positions
    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));

    // Distance
    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    // COLLISION DETECTION
    if (offsetX < 120 && offsetY < 120) {
        gameOver.innerHTML = "Game Over - Your Score: " + score;
        obstacle.classList.remove('obstacleAni');
        audiongo.play();
        setTimeout(() => {
            audiongo.pause();
            audio.pause();
        },1000);
    }

    // SCORE UPDATE
    else if (cross && offsetX < 145) {
        score += 1;
        updateScore(score);
        cross = false;

        setTimeout(() => {
            cross = true;
        }, 1000);
    }

}, 10);


// SCORE FUNCTION
function updateScore(score) {
    document.querySelector('#scoreCont').innerHTML = "Your Score : " + score;
}