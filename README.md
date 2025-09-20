# 🎮 WordHack  

**WordHack** is a modern, browser-based **Word Search Puzzle Game** built with **HTML, CSS, and JavaScript**.  
It allows users to **log in with a username and password**, keeps track of **scores** using `localStorage`, and provides a **fun interactive word search experience**.  

---

## ✨ Features  

### 🔑 Authentication
- **Login / Signup** with **username + password**  
- Validates existing users and prevents duplicate usernames  
- Password can be **shown/hidden** for convenience  
- Each user is **uniquely identified**  

### 🧩 Word Search Game
- Randomly generated **2D matrix (grid) of letters**  
- Words hidden **horizontally, vertically, and diagonally**  
- Words list displayed alongside the grid  
- Users can type their guess in an input box to find words  
- **Score tracking**: correct guesses increase score  
- **Timer**: complete puzzle within a set time limit  

### 📊 Profile Page
- Shows **username**, **high score**, and **games played**  
- Tracks **score history** per user  
- Button to **play game** or **logout**  

### 💾 Data Persistence
- Uses **`localStorage`** to store:  
  ```json
  {
    "username": {
      "password": "****",
      "highScore": 25,
      "gamesPlayed": 3
    }
  }