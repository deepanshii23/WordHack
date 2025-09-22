// Load active user
const activeUser = localStorage.getItem("activeUser");
if (!activeUser) {
  alert("Please login first!");
  window.location.href = "login.html";
}
const userData = JSON.parse(localStorage.getItem(activeUser));

// DOM elements
document.getElementById("username").textContent = activeUser;
let score = userData.score || 0;
document.getElementById("score").textContent = score;

const gridSize = 8;
const gridElement = document.getElementById("grid");

// Generate random matrix
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let matrix = [];

function generateGrid() {
  matrix = [];
  gridElement.innerHTML = "";
  for (let i = 0; i < gridSize; i++) {
    matrix[i] = [];
    for (let j = 0; j < gridSize; j++) {
      const char = letters[Math.floor(Math.random() * letters.length)];
      matrix[i][j] = char;
      const cell = document.createElement("div");
      cell.textContent = char;
      gridElement.appendChild(cell);
    }
  }
}
generateGrid();

// Timer
let timeLeft = 60;
const timerElement = document.getElementById("timer");

const timer = setInterval(() => {
  timeLeft--;
  timerElement.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timer);
    endGame();
  }
}, 1000);

// Word Check
const validWords = ["CAT", "DOG", "CODE", "HACK", "WORD", "GAME"]; // temp words

document.getElementById("checkBtn").addEventListener("click", () => {
  const input = document.getElementById("wordInput").value.toUpperCase();
  if (!input) return;

  if (validWords.includes(input)) {
    score += 10;
    document.getElementById("score").textContent = score;
    showMessage("✅ Correct! +10 points", "green");
  } else {
    showMessage("❌ Not found", "red");
  }

  document.getElementById("wordInput").value = "";
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("activeUser");
  window.location.href = "login.html";
});

// End Game
function endGame() {
  alert(`⏳ Time's up! Final Score: ${score}`);
  userData.score = score;
  localStorage.setItem(activeUser, JSON.stringify(userData));
  window.location.href = "profile.html";
}

function showMessage(msg, color) {
  const message = document.getElementById("message");
  message.textContent = msg;
  message.style.color = color;
}
