let gameSeq = [];
let userSeq = [];
let btns = ["yellow","red","purple","green"];
let started = false;
let level = 0;

// Selecting score displays
let h3 = document.querySelector("h3");
let highScoreDisplay = document.querySelector("#highScore"); // Assuming you have an element with ID highScore

// Initialize High Score from localStorage
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
highScoreDisplay.textContent = `High Score: ${highScore}`; // Display initial high score

// Start game on key press
document.addEventListener("keypress", function(){
    if (started == false) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
   
    let ranIdx = Math.floor(Math.random() * 4);
    let randColor = btns[ranIdx];
    let randBtn = document.querySelector(`.${randColor}`);
   
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
        console.log("same value");
    } else {
        // Game over: check if current level is a new high score
        if (level > highScore) {
            highScore = level;
            localStorage.setItem('highScore', highScore); // Save to localStorage
            highScoreDisplay.textContent = `High Score: ${highScore}`; // Update high score display
        }

        h3.innerHTML = `Game Over! Your score was <b>${level}</b>. <br> Press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}
