const activeUser = localStorage.getItem("activeUser");
if (!activeUser) {
  alert("Please login first!");
  window.location.href = "login.html";
}
document.getElementById("username").textContent = activeUser;

let score = 0;
const gridSize = 10;
let grid = [];
let words = ["CODE", "JAVA", "HTML", "CSS", "HACK"];
let foundWords = new Set();
let selectedCells = [];

// Build grid
function generateGrid() {
  // Fill grid with random letters
  grid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    )
  );

  // Place words horizontally
  words.forEach(word => {
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * (gridSize - word.length));
    for (let i = 0; i < word.length; i++) {
      grid[row][col + i] = word[i];
    }
  });

  renderGrid();
  renderWordList();
}

function renderGrid() {
  const gridContainer = document.getElementById("grid");
  gridContainer.innerHTML = "";

  grid.forEach((row, r) => {
    row.forEach((letter, c) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = letter;
      cell.dataset.row = r;
      cell.dataset.col = c;

      // Mouse events
      cell.addEventListener("mousedown", () => startSelection(cell));
      cell.addEventListener("mouseenter", (e) => dragSelection(cell, e));
      cell.addEventListener("mouseup", () => endSelection());

      gridContainer.appendChild(cell);
    });
  });
}

function renderWordList() {
  const list = document.getElementById("wordsToFind");
  list.innerHTML = "";
  words.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    li.id = "word-" + word;
    list.appendChild(li);
  });
}

// Selection logic
let isSelecting = false;

function startSelection(cell) {
  isSelecting = true;
  selectedCells = [cell];
  cell.classList.add("selected");
}

function dragSelection(cell, event) {
  if (!isSelecting) return;
  if (!selectedCells.includes(cell)) {
    selectedCells.push(cell);
    cell.classList.add("selected");
  }
}

function endSelection() {
  if (!isSelecting) return;
  isSelecting = false;

  const word = selectedCells.map(c => c.textContent).join("");
  checkWord(word);

  selectedCells.forEach(c => c.classList.remove("selected"));
  selectedCells = [];
}

function checkWord(word) {
  if (words.includes(word) && !foundWords.has(word)) {
    foundWords.add(word);
    score += 10;
    document.getElementById("score").textContent = score;

    // Mark grid cells
    selectedCells.forEach(c => c.classList.add("found"));

    // Mark word list
    document.getElementById("word-" + word).classList.add("found");

    showMessage(`🎉 Found "${word}"!`, "green");
  } else {
    showMessage("❌ Not a valid word!", "red");
  }
}

function showMessage(msg, color) {
  const message = document.getElementById("message");
  message.textContent = msg;
  message.style.color = color;
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("activeUser");
  window.location.href = "login.html";
});

// Init
generateGrid();
