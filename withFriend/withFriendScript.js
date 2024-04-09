let cellse = document.getElementsByClassName("cell")
let cells = Array.from(cellse)
let turnViewer = document.querySelector('.turns')
let xScores = document.querySelector(".Xscore")
let oScores = document.querySelector(".Oscore")
let resetBoard = document.querySelector(".reset")
let clearScore = document.querySelector(".clear")
let gameWinner = document.querySelector('.game-winner')
let gameWinnerContainer = document.querySelector('.show-winner')
let userMoves = Array(9).fill(null)
let winner = ""
let clicks = 0

function clearTheBoard() {
  userMoves = Array(9).fill(null)
  if (chance) {
    turnViewer.innerHTML = "X"
    turnViewer.style.backgroundColor = "rgb(187, 255, 191)"
  } else {
    turnViewer.innerHTML = "O"
    turnViewer.style.backgroundColor = "rgb(255, 187, 187)"
  }
  cells.forEach((cell) => {
    cell.innerHTML = ""
    cell.style.backgroundColor = "white"
  })
  gameWinnerContainer.style.visibility = "hidden"
}

function getAndUpdateScores() {
  xScores.innerHTML = `X : ${localStorage.getItem("xScore") || "0"}`
  oScores.innerHTML = `O : ${localStorage.getItem("oScore") || "0"}`
}

function result() {
  for (let i = 0; i < winningPattern.length; i++) {
    let [a, b, c] = winningPattern[i]
    if (userMoves[a] && userMoves[a] == userMoves[b] && userMoves[b] === userMoves[c]) {
      winner = userMoves[a]
      setTimeout(() => { clearTheBoard() }, 2000)
      gameWinnerContainer.style.visibility = "visible"
      return true
    }
  }
  if (!userMoves.includes(null)) {
    gameWinnerContainer.style.visibility = "visible"
    gameWinner.innerHTML = "Match Tied";
    setTimeout(clearTheBoard, 2000)
    return true
  }
  return false
}

getAndUpdateScores()

function setScore() {
  if (winner == "X") {
    localStorage.setItem("xScore", localStorage.getItem("xScore") ? +localStorage.getItem("xScore") + 1 : 1)
    gameWinner.innerHTML = "X is winner"
  }
  if (winner == "O") {
    localStorage.setItem("oScore", localStorage.getItem("oScore") ? +localStorage.getItem("oScore") + 1 : 1)
    gameWinner.innerHTML = "O is winner"
  }
  getAndUpdateScores()
}

clearScore.onclick = function () {
  localStorage.clear()
  getAndUpdateScores()
};
resetBoard.onclick = clearTheBoard;

let winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
]

let chance = true
let results = false

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const currentCellIndex = cells.indexOf(cell)
    if (userMoves[currentCellIndex] === null) {
      if (chance) {
        e.target.innerHTML = "X"
        userMoves[currentCellIndex] = "X"
        cell.style.backgroundColor = "rgb(187, 255, 191)"
      } else {
        e.target.innerHTML = "O"
        userMoves[currentCellIndex] = "O"
        cell.style.backgroundColor = "rgb(255, 187, 187)"
      }
      chance = !chance
      turnViewer.innerHTML = chance ? "X" : "O"
      turnViewer.style.backgroundColor = chance ? "rgb(187, 255, 191)" : "rgb(255, 187, 187)";
      if (result()) {
        setScore()
      }
    }
    getAndUpdateScores();
  })
});