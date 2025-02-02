console.log("Welcome to the game!");
let turnMusic = new Audio("ting.mp3");
turnMusic.volume = 0.4;
let gameOverMusic = new Audio("gameover.mp3");
gameOverMusic.volume = 0.9;
let isgameOver = false;
let turn = "X";
let currentWinLine = null;

//Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

function LineAnimation(e) {
    const lineElement = document.querySelector(".line");

    // Check the screen width and adjust the line's width and transform accordingly
    if (window.matchMedia("(max-width: 950px)").matches) {
        // For small screens (max-width: 950px)
        if (e[0] === 0 && e[1] === 4) {
            lineElement.style.width = "240px";
        } else if (e[0] === 2 && e[1] === 4) {
            lineElement.style.width = "240px";
        } else {
            lineElement.style.width = "224px";
        }
        // Apply transform with px units for smaller screens
        lineElement.style.transform = `translate(${e[3] * 8}px, ${
            e[4] * 8
        }px) rotate(${e[5]}deg)`;
    } else {
        // For larger screens (greater than 950px)
        if (e[0] === 0 && e[1] === 4) {
            lineElement.style.width = "30vw";
        } else if (e[0] === 2 && e[1] === 4) {
            lineElement.style.width = "30vw";
        } else {
            lineElement.style.width = "28vw";
        }
        // Apply transform with vw units for larger screens
        lineElement.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
    }
}

function winAnimation() {
    if (window.matchMedia("(max-width: 950px)").matches) {
        document
            .querySelector(".imagebox")
            .getElementsByTagName("img")[0].style.width = "175px";
    } else {
        document
            .querySelector(".imagebox")
            .getElementsByTagName("img")[0].style.width = "200px";
    }
}

// Function to check win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 3, 6, -10, 0, 90],
        [1, 4, 7, 0, 0, 90],
        [2, 5, 8, 10, 0, 90],
        [0, 1, 2, 0, -10, 0],
        [3, 4, 5, 0, 0, 0],
        [6, 7, 8, 0, 10, 0],
        [0, 4, 8, 0, 0, 45],
        [2, 4, 6, 0, 0, -45],
    ];
    wins.forEach((e) => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText =
                boxtext[e[0]].innerText + " Wins";
            isgameOver = true;
            winAnimation();
            LineAnimation(e);
            currentWinLine = e;
        }
    });
    if (count === 9 && !isgameOver) {
        document.querySelector(".info").innerText = "Tie";
        isgameOver = true;
    }
    if (isgameOver) {
        return;
    }
};

//game logic
let count = 0;
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !isgameOver) {
            boxtext.innerText = turn;
            count = count + 1;
            turn = changeTurn();
            checkWin();
            if (!isgameOver) {
                turnMusic.play();
            }
            if (isgameOver === false) {
                document.getElementsByClassName("info")[0].innerText =
                    "Turn for " + turn;
            }
        }
    });
});

document.getElementById("reset").addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((element) => {
        element.innerText = "";
    });
    isgameOver = false;
    turn = "X";
    document.getElementsByClassName("info")[0].innerText = "Turn for X";
    document
        .querySelector(".imagebox")
        .getElementsByTagName("img")[0].style.width = "0px";
    document.querySelector(".line").style.width = "0vw";
    count = 0;
    currentWinLine = false;
});

// Add resize event listener to adjust the line animation on window resize
window.addEventListener("resize", () => {
    if (currentWinLine) {
        LineAnimation(currentWinLine);
    }
});
