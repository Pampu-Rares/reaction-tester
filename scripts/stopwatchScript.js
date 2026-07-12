const appContainer = document.getElementById("app-container")
const minigameArea = document.getElementById("minigame-container")
const timeSpan = document.getElementById("time-span")
const infoSpan = document.getElementById("info-span")
const playerTurn = document.getElementById("player")

const screenOverlay = document.getElementById("screen-overlay")
const modeSelector = document.getElementById("mode-selector-container")
const singlePlayerBtn = document.getElementById("single-player")
const twoPlayerBtn = document.getElementById("2-player")

const selectModeBtn = document.getElementById("select-mode")

const bestAttemptSpan = document.getElementById("best-attempt")
const currentAttemptSpan = document.getElementById("current-attempt")

const winnerDialog = document.getElementById("winner-dialog")

const changeGamemodeBtn = document.getElementById("change-gamemode")

const scoreboard = document.getElementById("scoreboard")
const playersScores = document.getElementById("players-scores");
const playerOneScore = document.getElementById("player-1-score");
const playerTwoScore = document.getElementById("player-2-score");

let roundStarted = false, doNotPress = false, isResetting = false
let chosenTime = 10.000
let startTime, endTime, elapsedTime
let player = 1, playerOneWins = 0, playerOneInterval, playerTwoWins = 0, playerTwoInterval, playsCount = 0

function startTimer() {
    elapsedTime = 0
    startTime = null
    timeSpan.innerText = '0.000'
    timeSpan.style.opacity = '1';
    function update(currentTime) {
        if(startTime === null) startTime = currentTime
        elapsedTime = currentTime - startTime
        timeSpan.innerText = (elapsedTime/1000).toFixed(3)
        if(timeSpan.innerText == 3.900) timeSpan.style.opacity = '0'
        if(timeSpan.innerText.split('.')[0] < 5)
            timerInterval = requestAnimationFrame(update)
    }
    timerInterval = requestAnimationFrame(update)
}

function playGame() {
    if(!roundStarted) {
        infoSpan.innerText = 'Click at 10.000'
        startTimer()
        roundStarted = true
        /*
        setTimeout(() => {
            cancelAnimationFrame(timerInterval)
        }, 5000)
        //infoSpan.innerText = 'Click when the color turns blue'
        minigameArea.style.backgroundColor = 'var(--primary-color)'
        minigameArea.style.color = 'var(--background-color)'
        roundStarted = true
        doNotPress = true
        const timeToWait = (Math.random() * 5000) + 2001
        waitingInterval = setTimeout(() => {
            minigameArea.style.backgroundColor = 'var(--secondary-color)'
            minigameArea.style.color = 'black'
            infoSpan.innerText = 'Click'
            doNotPress = false
            startTime = performance.now()
        }, timeToWait)
        */
    }
    else endRound()
    /*
    else {
        endTime = performance.now()
        timeInterval = ((endTime - startTime)/1000).toPrecision(3)
        infoSpan.innerText = timeInterval + ' seconds. Click again when ready'
        currentAttemptSpan.innerText = timeInterval
        if(bestAttemptSpan.innerText === '' || Number(bestAttemptSpan.innerText) > timeInterval)
            bestAttemptSpan.innerText = timeInterval
        roundStarted = false
    }
    */
}

function endRound() {
    cancelAnimationFrame(timerInterval)
    endTime = performance.now()
    currentAttemptSpan.innerText = (Math.abs(chosenTime - ((endTime - startTime)/1000))).toFixed(3)
    timeSpan.innerText = '0.000'
    timeSpan.style.opacity = '1'
    roundStarted = false
    playsCount = 0
    winnerDialog.style.display = 'flex'
    winnerDialog.innerHTML = `
        <button id="close" onClick="${player === 2 ? 'showWinner()' : 'resetGame()'}">X</button>
        <h2 style="color: var(--text-color);">${singlePlayer ? 'See your' : 'Player ' + player} stats</h2>
        <div id="stats">
            <p style="color: var(--text-color);">Stopped At:</p>
            <p>${((endTime - startTime) / 1000).toFixed(3)}s</p>
            <p style="color: var(--text-color);">Delay:</p>
            <p>${currentAttemptSpan.innerText}</p>
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
    } else if(!bestAttemptSpan.innerText || bestAttemptSpan.innerText > currentAttemptSpan.innerText)
        bestAttemptSpan.innerText = currentAttemptSpan.innerText
    screenOverlay.style.display = 'flex'
    screenOverlay.style.opacity = '1'
    screenOverlay.style.pointerEvents = 'auto'
    appContainer.classList.add('blurred')
}

function resetGame() {
    appContainer.classList.remove('blurred')
    roundStarted = false
    infoSpan.innerText = 'Press to Play'
    timeSpan.innerText = '0.000'
    timeSpan.style.opacity = '1'
    minigameArea.style.backgroundColor = 'var(--secondary-color)'
    screenOverlay.style.opacity = '0'
    screenOverlay.style.pointerEvents = 'none'
    if(!singlePlayer) {
        if(player === 2)
            playerTurn.innerText = 'Player 2'
        else {
            playerTurn.innerText = 'Player 1'
            playerOneTime.innerText = 'TBD'
            playerOneHits.innerText = '0/20'
            playerTwoTime.innerText = 'TBD'
            playerTwoHits.innerText = '0/20'
        }
    } else playerTurn.innerText = ''

    setTimeout(() => {
        modeSelector.style.display = 'none'
        winnerDialog.style.display = 'none'
        screenOverlay.style.display = 'none'
    }, 301)
}

function closePopup() {
    appContainer.classList.remove("blurred")
    screenOverlay.style.opacity = '1'
    screenOverlay.style.pointerEvents = 'none'
    playerTurn.innerText = 'Player 1'
    playsCount = 0
    doNotPress = false
    roundStarted = false
    playerOneInterval = undefined
    playerTwoInterval = undefined
    minigameArea.style.backgroundColor = 'var(--secondary-color)'
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
        <h2>${playerOneInterval == playerTwoInterval || !playerOneInterval && !playerTwoInterval ? 'No one' : playerOneInterval < playerTwoInterval || !playerTwoInterval ? 'Player 1' : 'Player 2'} wins!</h2>
        <div id="stats">
            <p style="${playerOneInterval <= playerTwoInterval || !playerTwoInterval ? 'color: green;' : ''}">Player 1</p>
            <p style="${playerOneInterval <= playerTwoInterval || !playerTwoInterval ? 'color: green;' : ''}">${playerOneInterval}</p>
            <p style="${playerOneInterval >= playerTwoInterval || !playerOneInterval ? 'color: green;' : ''}">Player 2</p>
            <p style="${playerOneInterval >= playerTwoInterval || !playerOneInterval ? 'color: green;' : ''}">${playerTwoInterval}</p>
        </div>
    `
    screenOverlay.style.opacity = '1'
    screenOverlay.style.pointerEvents = 'auto'
    appContainer.classList.add("blurred")

    playerTurn.innerText = ''
    bestAttemptSpan.innerText = ''
    currentAttemptSpan.innerText = ''
}

minigameArea.addEventListener("click", () => {
    if(!isResetting) {
        playGame()
    }
})

window.addEventListener("keydown", (e) => {
    if(e.key === ' ' && screenOverlay.style.opacity == '0') {
        if(!singlePlayer) twoPlayerMode()
        else singlePlayerMode()
    }
})

function hideMainDialog() {
    appContainer.classList.remove("blurred")
    screenOverlay.style.opacity = '0'
    screenOverlay.style.pointerEvents = 'none'
    minigameArea.style.backgroundColor = 'var(--secondary-color)'
    minigameArea.style.color = 'black'
    infoSpan.innerText = 'Press to play'
    timeSpan.innerText = '0.000'
    roundStarted = false
    doNotPress = false

    if(singlePlayer) {
        playerTurn.innerText = ''
        playersScores.style.display = 'none'
        bestAttemptSpan.innerText = ''
        currentAttemptSpan.innerText = ''
        scoreboard.style.display = 'grid'
    }
    else {
        scoreboard.style.display = 'none'
        playerTurn.innerText = `Player 1`
        playersScores.style.display = 'grid'
        playsCount = 0
    }
    setTimeout(() => {
        modeSelector.style.display = 'none'
    }, 301)
}

singlePlayerBtn.addEventListener("click", () => {
    singlePlayer = true
    hideMainDialog()
})

twoPlayerBtn.addEventListener("click", () => {
    singlePlayer = false
    hideMainDialog()
})

selectModeBtn.addEventListener("click", () => {
    appContainer.classList.add("blurred")
    modeSelector.style.display = 'flex'

    screenOverlay.style.opacity = '1'
    screenOverlay.style.pointerEvents = 'auto'
})

changeGamemodeBtn.addEventListener("click", () => {
    window.location = 'index.html'
})