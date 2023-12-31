let numSquares = 6;
let colors = [];
let pickedColor;

document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    const modeButtons = document.querySelectorAll(".mode");
    modeButtons.forEach(button => {
        button.addEventListener("click", function() {
            modeButtons.forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");
            this.textContent === "Novice" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    });
}

function setupSquares() {
    const container = document.getElementById("container");
    container.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        container.appendChild(square);
    }
    document.querySelectorAll(".square").forEach(square => {
        square.addEventListener("click", function() {
            const clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                changeColors(clickedColor);
                document.getElementById("message").textContent = "Correct!";
                document.getElementById("reset").textContent = "Play Again?";
            } else {
                this.style.backgroundColor = "#f4f4f4";
                document.getElementById("message").textContent = "Try Again";
            }
        });
    });
    reset();
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    document.getElementById("reset").addEventListener("click", reset);
});

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    document.getElementById("color-display").textContent = pickedColor;
    document.querySelectorAll(".square").forEach((square, i) => {
        if (colors[i]) {
            square.style.display = "block";
            square.style.backgroundColor = colors[i];
        } else {
            square.style.display = "none";
        }
    });
    document.getElementById("message").textContent = "";
    document.getElementById("reset").textContent = "New Colors";
}

function changeColors(color) {
    document.querySelectorAll(".square").forEach(square => {
        square.style.backgroundColor = color;
    });
}

function pickColor() {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
