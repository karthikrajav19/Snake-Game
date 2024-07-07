const gameArea = document.querySelector(".game_area");
const scoreCard = document.querySelector(".current_score");
const highScore = document.querySelector(".high_score");
const arrows = document.querySelectorAll(".arrow_controls i");
const body = document.querySelector("body");

let retry = false;
let pryX, pryY;
let headX = 11, headY = 19;
let speedX = 0, speedY = 0;
let bodyOfSnake = [];
let loadTime;
let score = 0;

let setHighScore = localStorage.getItem("high_score") || 0;
highScore.innerText = `High Score : ${setHighScore}`;

const controls = (e) => {
    if (e.key === "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }

    if (e.key === "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }

    if (e.key === "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    }

    if (e.key === "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }

}

arrows.forEach(key => {
    key.addEventListener("click", () => controls({key:key.dataset.key}));
})

const retryManager = () => {
    clearInterval(loadTime);
    alert("Game over...!");
    location.reload();
}
const randomPath = () => {
    pryX = Math.floor(Math.random() * 35) + 1;
    pryY = Math.floor(Math.random() * 35) + 1;
}


const startGame = () => {
    if (retry) {
        return retryManager();
    }
    let insertPry = `<div class="pry" style = "grid-area : ${pryY}/${pryX};"></div>`;

    if (headX === pryX && headY === pryY) {
        randomPath();
        bodyOfSnake.push([pryX, pryY]);
        score++;
        setHighScore = score >= setHighScore ? score : setHighScore;
        scoreCard.innerText = `Score : ${score}`;
        localStorage.setItem("high_score",setHighScore);
    }

    for (let i = bodyOfSnake.length - 1; i > 0; i--) {
        bodyOfSnake[i] = bodyOfSnake[i - 1];
    }

    bodyOfSnake[0] = [headX, headY];

    headX += speedX;
    headY += speedY;

    if (headX <= 0 || headX > 35 || headY <= 0 || headY > 35) {
        retry = true;
    }

    for (let i = 0; i < bodyOfSnake.length; i++) {
        insertPry += `<div class="snake" style = "grid-area : ${bodyOfSnake[i][1]}/${bodyOfSnake[i][0]};"></div>`;
        if (i !== 0 && bodyOfSnake[0][0] === bodyOfSnake[i][0] && bodyOfSnake[0][1] === bodyOfSnake[i][1]) {
            retry = true;
        }
    }

    gameArea.innerHTML = insertPry;
}

randomPath();
loadTime = setInterval(startGame, 120);
document.addEventListener("keydown", controls);