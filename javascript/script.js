function loginUser() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    document.getElementById("loginMessage").innerText = "⚠️ Please enter both username and password";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    if (users[username].password === password) {
      document.getElementById("loginMessage").innerText = "✅ Login successful!";
      localStorage.setItem("activeUser", username);
      setTimeout(() => window.location.href = "profile.html", 800);
    } else {
      document.getElementById("loginMessage").innerText = "❌ Wrong password!";
    }
  } else {
    users[username] = { password: password, highScore: 0, gamesPlayed: 0 };
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("activeUser", username);

    document.getElementById("loginMessage").innerText = "🎉 Account created!";
    setTimeout(() => window.location.href = "profile.html", 800);
  }
}

// 👁️ Show/Hide password
function togglePassword() {
  let passField = document.getElementById("password");
  passField.type = passField.type === "password" ? "text" : "password";
}
