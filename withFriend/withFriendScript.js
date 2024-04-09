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
let chance = true
let winner = ""


function clearTheBoard(){
    userMoves = Array(9).fill(null)
    // chance = !chance

    if(chance){
        turnViewer.innerHTML = "X"
        turnViewer.style.backgroundColor = "rgb(187, 255, 191)"
    }else{
        turnViewer.innerHTML = "O"
        turnViewer.style.backgroundColor = "rgb(255, 187, 187)"
    }
    cells.forEach((cell)=>{
        cell.innerHTML = ""
        cell.style.backgroundColor = "white"
    })
    gameWinnerContainer.style.visibility = "hidden"
    
}

function getAndUpdateScores(){
    xScores.innerHTML = `X : ${localStorage.getItem("xScore") || "0"}`
    oScores.innerHTML = `O : ${localStorage.getItem("oScore") || "0"}`
}
function result(){
    // let result = false
    for(let i = 0;i < winningPattern.length;i++){
        let [a,b,c] = winningPattern[i]
            if(userMoves[a] && userMoves[a] == userMoves[b] && userMoves[b] === userMoves[c]){
                winner = userMoves[a]
                // result = true
                setTimeout(()=>{clearTheBoard()},2000)
                gameWinnerContainer.style.visibility = "visible"
                return true
            }
        }
        if(!userMoves.includes(null)){
            gameWinnerContainer.style.visibility = "visible"
            gameWinner.innerHTML = "Match Tied";
            setTimeout(clearTheBoard,2000)
            return false
    }
    
}

function setScore(){
    if(winner == "X"){
        localStorage.setItem("xScore",localStorage.getItem("xScore") ? +localStorage.getItem("xScore")+1 : 1)
        gameWinner.innerHTML = "X is winner"
        // chance = !chance
    }
    if(winner == "O"){
        localStorage.setItem("oScore",localStorage.getItem("oScore") ? +localStorage.getItem("oScore") +1 : 1)
        gameWinner.innerHTML = "O is winner"
        // chance = !chance
    }
    getAndUpdateScores()
}


clearScore.onclick = function(){
    localStorage.clear()
    getAndUpdateScores()
};

resetBoard.onclick = clearTheBoard;

let winningPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]


// getAndUpdateScores();
let results = false
cells.forEach((cell) => {
    let clicks = 2
    cell.addEventListener("click",(e)=>{
        const currentCellIndex = cells.indexOf(cell)
        clicks -= 1
        if(chance){
            userMoves[currentCellIndex] == null && (e.target.innerHTML = "X") && (userMoves[currentCellIndex] = "X") && (turnViewer.innerHTML = "O") && (cell.style.backgroundColor = "rgb(187, 255, 191)") && (turnViewer.style.backgroundColor = "rgb(255, 187, 187)");
            if(clicks == 1){
                chance = !chance
            };
        }else{
            userMoves[currentCellIndex] == null && (e.target.innerHTML = "O") && (userMoves[currentCellIndex] = "O") && (turnViewer.innerHTML = "X") && (cell.style.backgroundColor = "rgb(255, 187, 187)") && (turnViewer.style.backgroundColor = "rgb(187, 255, 191)");

            if(clicks == 1){
                chance = !chance
            };
        }
        
        if(clicks==1){
            if(result()){
                setScore()
            }
        }
        getAndUpdateScores();
    })
});




// export {clearTheBoard,setScore,}