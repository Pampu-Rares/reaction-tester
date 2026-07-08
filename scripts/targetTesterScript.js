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
const playerOneScore = document.getElementById("player-1-score");
const playerTwoScore = document.getElementById("player-2-score");

const playBtn = document.getElementById("play-btn")
const target = document.getElementById("target")

let roundStarted = false, isResetting = false, singlePlayer = true, noLatency = true
let playsCount = 0
let startTime, endTime
let player = 1, playerOneWins = 0, playerOneInterval, playerTwoWins = 0, playerTwoInterval


function endRound() {
    endTime = performance.now()
    roundStarted = false
    playsCount = 0
    target.style.display = 'none'
    winnerDialog.style.display = 'flex'
    winnerDialog.innerHTML = `
        <button id="close" onClick="closePopup()">X</button>
        <h2 style="color: black;">See your stats</h2>
        <div id="stats">
            <p style="color: black;">Total time:</p>
            <p style="">${((endTime - startTime) / 1000).toFixed(3)}s</p>
            <p style="color: black;">Targets Missed:</p>
            <p style="">${String(targetsMissedSpan.innerText)}</p>
        </div>
    `
    screenOverlay.style.opacity = '1'
    screenOverlay.style.pointerEvents = 'auto'
    playBtn.style.display = 'inline-block' // it may be block
}

function singlePlayerMode(missed = false) {
    if(missed) {
        targetsMissedSpan.innerText = String(Number(targetsMissedSpan.innerText) + 1)
        minigameArea.style.backgroundColor = 'Red'
        setTimeout(() => {
            minigameArea.style.backgroundColor = 'var(--color-1)'
        },300)
    }
    else {
        targetsHitSpan.innerText = String(Number(targetsHitSpan.innerText.split('/')[0]) + 1) + '/20'
    }
    playsCount++;
    console.log(playsCount)
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

function closePopup() {
    screenOverlay.style.opacity = '0'
    screenOverlay.style.pointerEvents = 'none'
    if(!singlePlayer) {
        playerTurn.innerText = 'Player 1'
        playerOneInterval = undefined
        playerTwoInterval = undefined
        playerOneScore.innerText = ''
        playerTwoScore.innerText = ''
    }
    targetsMissedSpan.innerText = '0'
    targetsHitSpan.innerText = '0/10'
    setTimeout(() => {
        winnerDialog.style.display = 'none'
        screenOverlay.style.display = 'none'
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
    if(roundStarted) {
        if(!singlePlayer) twoPlayerMode(true)
            else singlePlayerMode(true)
    }
})

singlePlayerBtn.addEventListener("click", () => {
    hideMainDialog()
    playersScores.style.display = 'none'
    singlePlayer = true
    //resetGame()
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

playBtn.addEventListener("click", () => {
    event.stopPropagation()
    roundStarted = true
    playBtn.style.display = 'none'
    target.style.display = 'block'
    startTime = performance.now()
})

target.addEventListener("click", () => {
    event.stopPropagation()
    if(singlePlayer) singlePlayerMode()
        else twoPlayerMode()
})

selectModeBtn.addEventListener("click", () => {
    modeSelector.style.display = 'flex'
    screenOverlay.style.display = 'flex'

    screenOverlay.style.opacity = '1'
    screenOverlay.style.pointerEvents = 'auto'
})

changeGamemodeBtn.addEventListener("click", () => {
    window.location = './index.html'
})