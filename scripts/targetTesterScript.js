const appContainer = document.getElementById("app-container")
const minigameArea = document.getElementById("minigame-container")
const infoSpan = document.getElementById("info-span")

const screenOverlay = document.getElementById("screen-overlay")
const modeSelector = document.getElementById("mode-selector-container")
const singlePlayerBtn = document.getElementById("single-player")
const twoPlayerBtn = document.getElementById("2-player")

const selectModeBtn = document.getElementById("select-mode")
const changeGamemodeBtn = document.getElementById("change-gamemode")

const targetsMissedSpan = document.getElementById("targets-missed")
const targetsHitSpan = document.getElementById("targets-hit")

const winnerDialog = document.getElementById("winner-dialog")

const playersScores = document.getElementById("players-scores");
const playerOneTime = document.getElementById("player-1-time");
const playerOneHits = document.getElementById("player-1-hits");
const playerTwoTime = document.getElementById("player-2-time");
const playerTwoHits = document.getElementById("player-2-hits");

const playBtn = document.getElementById("play-btn")
const target = document.getElementById("target")

const difficultySelector = document.getElementById("difficulty-selector")

let roundStarted = false, isResetting = false, singlePlayer = true, noLatency = true
let playsCount = 0
let startTime, endTime, targetDifficulty = 'easy-difficulty'
let player = 1, playerOneWins = 0, playerTwoWins = 0


function resetGame() {
    appContainer.classList.remove('blurred')
    playsCount = 0
    roundStarted = false
    target.style.display = 'none'
    playBtn.style.display = 'inline-block'
    minigameArea.style.backgroundColor = 'var(--color-1)'
    screenOverlay.style.opacity = '0'
    screenOverlay.style.pointerEvents = 'none'
    if(!singlePlayer) {
        if(player === 2)
            playBtn.innerText = 'Player 2: Play'
        else {
            playBtn.innerText = 'Player 1: Play'
            playerOneTime.innerText = 'TBD'
            playerOneHits.innerText = '0/20'
            playerTwoTime.innerText = 'TBD'
            playerTwoHits.innerText = '0/20'
        }
    } else playBtn.innerText = 'Play'
    targetsMissedSpan.innerText = '0'
    targetsHitSpan.innerText = '0/10'
    const heightMultiplier = Math.random() * (minigameArea.offsetHeight - target.offsetHeight)
    const widthMultiplier = Math.random() * (minigameArea.offsetWidth - target.offsetWidth)
    target.style.top = String(heightMultiplier) + 'px'
    target.style.left = String(widthMultiplier) + 'px'
    setTimeout(() => {
        modeSelector.style.display = 'none'
        winnerDialog.style.display = 'none'
        screenOverlay.style.display = 'none'
    }, 301)
}

function endRound() {
    endTime = performance.now()
    roundStarted = false
    playsCount = 0
    target.style.display = 'none'
    winnerDialog.style.display = 'flex'
    winnerDialog.innerHTML = `
        <button id="close" onClick="${player === 2 ? 'showWinner()' : 'resetGame()'}">X</button>
        <h2 style="color: black;">${singlePlayer ? 'See your' : 'Player ' + player} stats</h2>
        <div id="stats">
            <p style="color: black;">Total time:</p>
            <p style="">${((endTime - startTime) / 1000).toFixed(3)}s</p>
            <p style="color: black;">Targets Missed:</p>
            <p style="${Number(targetsMissedSpan.innerText) ? 'color: red;' : ''}">${targetsMissedSpan.innerText}</p>
        </div>
    `
    if(!singlePlayer) {
        if(player === 1) {
            player = 2
            playerOneTime.innerText = String(((endTime - startTime) / 1000).toFixed(3)) + 's'
        } else {
            player = 1
            playerTwoTime.innerText = String(((endTime - startTime) / 1000).toFixed(3)) + 's'
        } 
    }
    screenOverlay.style.display = 'flex'
    screenOverlay.style.opacity = '1'
    screenOverlay.style.pointerEvents = 'auto'
    playBtn.style.display = 'inline-block' // it may be block
    appContainer.classList.add('blurred')
}

function showWinner() {
    let playerOneInterval = Number(playerOneTime.innerText.slice(0, playerOneTime.innerText.length - 1))
    let playerOneMisses = 20 - playerOneHits.innerText.split('/')[0]
    let playerTwoInterval = Number(playerTwoTime.innerText.slice(0, playerTwoTime.innerText.length - 1))
    let playerTwoMisses = 20 - playerTwoHits.innerText.split('/')[0]
    playerOneInterval += playerOneMisses * 2.0
    playerTwoInterval += playerTwoMisses * 2.0
    let winner
    if(playerOneInterval < playerTwoInterval) winner = 1
    else if(playerTwoInterval < playerOneInterval) winner =  2
    winnerDialog.innerHTML = `
        <button id="close" onClick="resetGame()">X</button>
        <h2 style="color: black;">${winner === 1 ? 'Player 1' : winner === 2 ? 'Player 2' :'No one'} wins!</h2>
        <div id="extended-stats">
            <p style="${winner === 2 ? 'color: black;' : ''}">Player 1</p>
            <p style="${winner === 2 ? 'color: black;' : ''}">${playerOneInterval}</p>
            <p style="${winner === 2 ? 'color: black;' : ''}">${20 - playerOneMisses}/20</p>
            <p style="${winner === 1 ? 'color: black;' : ''}">Player 2</p>
            <p style="${winner === 1 ? 'color: black;' : ''}">${playerTwoInterval}</p>
            <p style="${winner === 1 ? 'color: black;' : ''}">${20 - playerTwoMisses}/20</p>
        </div>
    `
    player = 1
}

function twoPlayerMode() {
    if(player == 1) {
        playerOneHits.innerText = targetsHitSpan.innerText
    } else playerTwoHits.innerText = targetsHitSpan.innerText
}

function playGame(missed = false) {
    if(missed) {
        targetsMissedSpan.innerText = String(Number(targetsMissedSpan.innerText) + 1)
        minigameArea.style.backgroundColor = 'Red'
        setTimeout(() => {
            minigameArea.style.backgroundColor = 'var(--color-1)'
        },300)
    }
    else {
        targetsHitSpan.innerText = String(Number(targetsHitSpan.innerText.split('/')[0]) + 1) + '/20'
        if(!singlePlayer) twoPlayerMode()
    }
    playsCount++;
    if(playsCount == 20) endRound()
    else if(noLatency) {
        const heightMultiplier = Math.random() * (minigameArea.offsetHeight - target.offsetHeight)
        const widthMultiplier = Math.random() * (minigameArea.offsetWidth - target.offsetWidth)
        target.style.top = String(heightMultiplier) + 'px'
        target.style.left = String(widthMultiplier) + 'px'
    } else {
        // add latency option
    }
}

function hideMainDialog() {
    appContainer.classList.remove('blurred')
    screenOverlay.style.opacity = '0'
    screenOverlay.style.pointerEvents = 'none'
    setTimeout(() => {
        modeSelector.style.display = 'none'
        //screenOverlay.style.display = 'none'
    }, 301)
}


minigameArea.addEventListener("click", () => {
    if(roundStarted) {
        playGame(true)
    }
})

singlePlayerBtn.addEventListener("click", () => {
    hideMainDialog()
    playersScores.style.display = 'none'
    singlePlayer = true
    resetGame()
})

twoPlayerBtn.addEventListener("click", () => {
    hideMainDialog()
    playersScores.style.display = 'grid'
    singlePlayer = false
    resetGame()
})

playBtn.addEventListener("click", () => {
    event.stopPropagation()
    roundStarted = true
    playBtn.style.display = 'none'
    target.style.display = 'block'
    startTime = performance.now()
})

target.addEventListener("click", () => {
    event.stopPropagation()
    playGame()
})

selectModeBtn.addEventListener("click", () => {
    appContainer.classList.add('blurred')
    modeSelector.style.display = 'flex'
    screenOverlay.style.display = 'flex'

    screenOverlay.style.opacity = '1'
    screenOverlay.style.pointerEvents = 'auto'
})

changeGamemodeBtn.addEventListener("click", () => {
    window.location = './index.html'
})

difficultySelector.addEventListener("change", () => {
    target.classList.toggle(targetDifficulty)
    if(difficultySelector.value === 'easy') targetDifficulty = 'easy-difficulty'
    else if(difficultySelector.value === 'medium') targetDifficulty = 'medium-difficulty'
    else targetDifficulty = 'hard-difficulty'
    target.classList.toggle(targetDifficulty)
    resetGame()
})