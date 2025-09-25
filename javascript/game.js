// Full Word Bank
let wordBank = ["CODE", "JAVA", "HTML", "CSS", "NODE", "REACT", "ANGULAR", "PYTHON", "MONGO", "EXPRESS", "GITHUB", "FUNCTION", "ARRAY", "OBJECT", "VARIABLE"];
let words = []; // 5 words per round
let gridSize = 10; // 10x10 grid
let score = 0;
let selectedCells = [];
let isDragging = false;
let timeLeft = 60; // 1 minute
let timer;

window.onload = () => {
    startNewGame();

    // Exit button
    document.getElementById("exit-btn").addEventListener("click", () => {
        finalizeGame();
    });

    document.getElementById("restart-btn").addEventListener("click", () => {
        startNewGame();
    });
};

// ---------------- NEW GAME ----------------
function startNewGame() {
    score = 0;
    selectedCells = [];
    isDragging = false;
    timeLeft = 60;
    document.getElementById("score").textContent = score;

    // Pick 5 random words
    words = [];
    let shuffled = [...wordBank].sort(() => 0.5 - Math.random());
    words = shuffled.slice(0, 5);

    generateGrid();
    placeWords();
    displayWords();
    startTimer();
}

// ---------------- GRID GENERATION ----------------
function generateGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.textContent = getRandomLetter();

            // Mouse events for dragging
            cell.addEventListener("mousedown", () => startSelection(cell));
            cell.addEventListener("mouseover", () => dragSelection(cell));
            cell.addEventListener("mouseup", checkSelection);

            grid.appendChild(cell);
        }
    }

    // Cancel stuck selection
    document.addEventListener("mouseup", () => {
        if (isDragging) clearSelection();
    });
}

function getRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
}

// ---------------- PLACE WORDS ----------------
function placeWords() {
    const cells = document.querySelectorAll(".cell");
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            let row = Math.floor(Math.random() * gridSize);
            let col = Math.floor(Math.random() * gridSize);
            let directionRand = Math.random();
            let direction;
            if(directionRand < 0.33) direction = "H";
            else if(directionRand < 0.66) direction = "V";
            else direction = "D"; // diagonal

            if (canPlaceWord(word, row, col, direction, cells)) {
                for (let i = 0; i < word.length; i++) {
                    let index;
                    if(direction === "H") index = row * gridSize + (col + i);
                    else if(direction === "V") index = (row + i) * gridSize + col;
                    else index = (row + i) * gridSize + (col + i); // diagonal

                    cells[index].textContent = word[i];
                }
                placed = true;
            }
        }
    });
}

function canPlaceWord(word, row, col, direction, cells) {
    if (direction === "H" && col + word.length > gridSize) return false;
    if (direction === "V" && row + word.length > gridSize) return false;
    if (direction === "D" && (row + word.length > gridSize || col + word.length > gridSize)) return false;

    for (let i = 0; i < word.length; i++) {
        let index;
        if(direction === "H") index = row * gridSize + (col + i);
        else if(direction === "V") index = (row + i) * gridSize + col;
        else index = (row + i) * gridSize + (col + i);

        if (!cells[index]) return false;
    }
    return true;
}

// ---------------- DISPLAY WORDS ----------------
function displayWords() {
    const list = document.getElementById("word-list");
    list.innerHTML = "";
    words.forEach(word => {
        let li = document.createElement("li");
        li.id = "word-" + word;
        li.textContent = word;
        list.appendChild(li);
    });
    document.getElementById("words-left").textContent = "Words Left: " + words.length;
}

// ---------------- DRAGGING ----------------
function startSelection(cell) {
    isDragging = true;
    selectedCells = [cell];
    cell.classList.add("selected");
}

function dragSelection(cell) {
    if (!isDragging || selectedCells.includes(cell)) return;
    selectedCells.push(cell);
    cell.classList.add("selected");
}

function checkSelection() {
    if (!isDragging) return;
    isDragging = false;

    let word = selectedCells.map(c => c.textContent).join("");
    let reversed = word.split("").reverse().join("");

    let matchedWord = null;
    if (words.includes(word)) matchedWord = word;
    else if (words.includes(reversed)) matchedWord = reversed;

    if (matchedWord) {
        highlightWord();
        updateScore(10);
        markWordFound(matchedWord);
    } else {
        clearSelection();
    }
}

// ---------------- SELECTION UTILS ----------------
function highlightWord() {
    selectedCells.forEach(c => c.classList.add("found"));
    selectedCells = [];
}

function clearSelection() {
    selectedCells.forEach(c => c.classList.remove("selected"));
    selectedCells = [];
}

// ---------------- SCORE ----------------
function updateScore(points) {
    score += points;
    document.getElementById("score").textContent = score;
}

// ---------------- WORD TRACKING ----------------
function markWordFound(word) {
    const index = words.indexOf(word);
    if (index !== -1) {
        words.splice(index, 1);
        document.getElementById("words-left").textContent = "Words Left: " + words.length;
        document.getElementById("word-" + word).classList.add("found");
    }

    if (words.length === 0) {
        clearInterval(timer);
        finalizeGame();
    }
}

// ---------------- TIMER ----------------
function startTimer() {
    clearInterval(timer);
    const timerElement = document.getElementById("timer");
    timerElement.textContent = "⏱️ " + timeLeft + "s";

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = "⏱️ " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timer);
            finalizeGame();
        }
    }, 1000);
}

// ---------------- GAME END ----------------
function finalizeGame() {
    clearInterval(timer);

    const activeUser = localStorage.getItem("activeUser");
    if (activeUser) {
        let userData = JSON.parse(localStorage.getItem(activeUser));
        userData.lastScore = score;
        userData.highScore = Math.max(userData.highScore || 0, score);
        userData.totalGames = (userData.totalGames || 0) + 1;
        localStorage.setItem(activeUser, JSON.stringify(userData));
    }

    alert("Game Over! Final Score: " + score);
    window.location.href = "profile.html";
}
