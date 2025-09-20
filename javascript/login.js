// Toggle between Login & Register
document.getElementById("showRegister").addEventListener("click", () => {
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("registerForm").classList.add("active");
});

document.getElementById("showLogin").addEventListener("click", () => {
  document.getElementById("registerForm").classList.remove("active");
  document.getElementById("loginForm").classList.add("active");
});

// Register
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  if (localStorage.getItem(username)) {
    alert("Username already taken. Choose another.");
    return;
  }

  const userData = { username, password, score: 0, highScore: 0 };
  localStorage.setItem(username, JSON.stringify(userData));

  alert("Registration successful! Please login.");
  document.getElementById("registerForm").reset();

  // Switch to login form
  document.getElementById("registerForm").classList.remove("active");
  document.getElementById("loginForm").classList.add("active");
});

// Login
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const storedUser = localStorage.getItem(username);

  if (!storedUser) {
    alert("User not found. Please register.");
    return;
  }

  const userData = JSON.parse(storedUser);

  if (userData.password === password) {
    localStorage.setItem("activeUser", username);
    window.location.href = "profile.html";
  } else {
    alert("Incorrect password. Try again.");
  }
});
