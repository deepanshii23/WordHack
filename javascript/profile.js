// Check if user is logged in
const activeUser = localStorage.getItem("activeUser");

if (!activeUser) {
  window.location.href = "login.html";
} else {
  const userData = JSON.parse(localStorage.getItem(activeUser));

  // Display info
  document.getElementById("welcomeUser").textContent = userData.username;
  document.getElementById("profileScore").textContent = userData.score || 0;
  document.getElementById("profileHighScore").textContent = userData.highScore || 0;
}

// Play Game button
document.getElementById("playBtn").addEventListener("click", () => {
  window.location.href = "game.html";
});

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("activeUser");
  window.location.href = "login.html";
});
