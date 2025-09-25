window.onload = () => {
    const activeUser = localStorage.getItem("activeUser");
    if (!activeUser) {
        alert("No active user found! Please login.");
        window.location.href = "login.html";
        return;
    }

    const userData = JSON.parse(localStorage.getItem(activeUser));

    document.getElementById("username").textContent = activeUser;
    document.getElementById("lastScore").textContent = userData.lastScore || 0;
    document.getElementById("highScore").textContent = userData.highScore || 0;
    document.getElementById("totalGames").textContent = userData.totalGames || 0;

    // Set profile picture if user saved one
    if(userData.profilePic) {
        document.getElementById("profile-pic").src = userData.profilePic;
    }

    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("activeUser");
        window.location.href = "login.html";
    });

    document.getElementById("play-btn").addEventListener("click", () => {
        window.location.href = "game.html";
    });
};
