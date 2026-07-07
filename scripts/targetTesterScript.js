const minigameArea = document.getElementById("minigame-container")
const infoSpan = document.getElementById("info-span")

const screenOverlay = document.getElementById("screen-overlay")
const modeSelector = document.getElementById("mode-selector-container")
const singlePlayerBtn = document.getElementById("single-player")
const twoPlayerBtn = document.getElementById("2-player")

const selectModeBtn = document.getElementById("select-mode")
const changeGamemodeBtn = document.getElementById("change-gamemode")

const targetsMissedSpan = document.getElementById("targets-missed")
const reactionTimeSpan = document.getElementById("reaction-time")

const winnerDialog = document.getElementById("winner-dialog")

const playersScores = document.getElementById("players-scores");
const playerOneScore = document.getElementById("player-1-score");
const playerTwoScore = document.getElementById("player-2-score");

let roundStarted = false, isResetting = false
let waitingInterval
let startTime, endTime
let player = 1, playerOneWins = 0, playerOneInterval, playerTwoWins = 0, playerTwoInterval, playsCount = 0

function singlePlayerMode() {
}

function closePopup() {
    screenOverlay.style.opacity = '1'
    screenOverlay.style.pointerEvents = 'none'
    playerTurn.innerText = 'Player 1'
    playsCount = 0
    doNotPress = false
    roundStarted = false
    playerOneInterval = undefined
    playerTwoInterval = undefined
    minigameArea.style.backgroundColor = 'var(--color-1)'
    minigameArea.style.color = 'black'
    infoSpan.innerText = 'Press to play'
    playerOneScore.innerText = ''
    playerTwoScore.innerText = ''
    setTimeout(() => {
        winnerDialog.style.display = 'none'
    }, 301)
}

function showWinner() {
    winnerDialog.style.display = 'flex'
    winnerDialog.innerHTML = `
        <button id="close" onClick="closePopup()">X</button>
        <h2 style="color: white;">${playerOneInterval == playerTwoInterval || !playerOneInterval && !playerTwoInterval ? 'No one' : playerOneInterval < playerTwoInterval || !playerTwoInterval ? 'Player 1' : 'Player 2'} wins!</h2>
        <div id="stats">
            <p style="${playerOneInterval <= playerTwoInterval || !playerTwoInterval ? 'color: white;' : ''}">Player 1</p>
            <p style="${playerOneInterval <= playerTwoInterval || !playerTwoInterval ? 'color: white;' : ''}">${playerOneInterval}</p>
            <p style="${playerOneInterval >= playerTwoInterval || !playerOneInterval ? 'color: white;' : ''}">Player 2</p>
            <p style="${playerOneInterval >= playerTwoInterval || !playerOneInterval ? 'color: white;' : ''}">${playerTwoInterval}</p>
        </div>
    `
    screenOverlay.style.opacity = '1'
    screenOverlay.style.pointerEvents = 'auto'

    playerTurn.innerText = ''
    bestAttemptSpan.innerText = ''
    currentAttemptSpan.innerText = ''
}

function twoPlayerMode() {
}

function hideMainDialog() {
    screenOverlay.style.opacity = '0'
    screenOverlay.style.pointerEvents = 'none'
    setTimeout(() => {
        modeSelector.style.display = 'none'
    }, 301)
}

function resetGame() {
    roundStarted = false
    doNotPress = false
    minigameArea.style.backgroundColor = 'var(--color-1)'
    minigameArea.style.color = 'black'
    infoSpan.innerText = 'Click'
}

minigameArea.addEventListener("click", () => {
    if(!singlePlayer) twoPlayerMode()
        else singlePlayerMode()
})

singlePlayerBtn.addEventListener("click", () => {
    playerTurn.innerText = ''
    bestAttemptSpan.innerText = ''
    currentAttemptSpan.innerText = ''
    hideMainDialog()
    playersScores.style.display = 'none'
    singlePlayer = true
    resetGame()
})

twoPlayerBtn.addEventListener("click", () => {
    playersScores.style.display = 'grid'
    hideMainDialog()
    singlePlayer = false
    bestAttemptSpan.innerText = ''
    currentAttemptSpan.innerText = ''
    playerTurn.innerText = `Player 1`
    playsCount = 0
    resetGame()
})

selectModeBtn.addEventListener("click", () => {
    modeSelector.style.display = 'flex'

    screenOverlay.style.opacity = '1'
    screenOverlay.style.pointerEvents = 'auto'
})

changeGamemodeBtn.addEventListener("click", () => {
    window.location = './index.html'
})