const minigameArea = document.getElementById("minigame-container")
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

let roundStarted = false, doNotPress = false
let waitingInterval
let startTime, endTime
let player = 1, playerOneWins = 0, playerOneInterval, playerTwoWins = 0, playerTwoInterval, playsCount = 0

function singlePlayerMode() {
    if(!roundStarted) {
        infoSpan.innerText = 'Click when the color turns blue'
        minigameArea.style.backgroundColor = 'red'
        minigameArea.style.color = 'white'
        roundStarted = true
        doNotPress = true
        const timeToWait = (Math.random() * 5000) + 2001
        waitingInterval = setTimeout(() => {
            minigameArea.style.backgroundColor = 'var(--color-1)'
            minigameArea.style.color = 'black'
            infoSpan.innerText = 'Click'
            doNotPress = false
            startTime = performance.now()
        }, timeToWait)
    }
    else if(doNotPress) {
        infoSpan.innerText = 'You pressed too soon'
        currentAttemptSpan.innerText = 'early'
        setTimeout(() => {
            minigameArea.style.backgroundColor = 'var(--color-1)'
            minigameArea.style.color = 'black'
            infoSpan.innerText = 'Click'
            doNotPress = false
            roundStarted = false
        }, 2000)
        clearTimeout(waitingInterval)
    }
    else {
        endTime = performance.now()
        timeInterval = ((endTime - startTime)/1000).toPrecision(3)
        infoSpan.innerText = timeInterval + ' seconds. Click again when ready'
        currentAttemptSpan.innerText = timeInterval
        if(bestAttemptSpan.innerText === '' || Number(bestAttemptSpan.innerText) > timeInterval)
            bestAttemptSpan.innerText = timeInterval
        roundStarted = false
    }
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
    if(playsCount < 3) playerTurn.innerText = `Player 1`
    else playerTurn.innerText = `Player 2`
    if(!roundStarted) {
        playsCount++
        if(playsCount == 4) {
            bestAttemptSpan.innerText = ''
            currentAttemptSpan.innerText = ''
        }
        infoSpan.innerText = 'Click when the color turns blue'
        minigameArea.style.backgroundColor = 'red'
        minigameArea.style.color = 'white'
        roundStarted = true
        doNotPress = true
        const timeToWait = (Math.random() * 5000) + 2001
        waitingInterval = setTimeout(() => {
            minigameArea.style.backgroundColor = 'var(--color-1)'
            minigameArea.style.color = 'black'
            infoSpan.innerText = 'Click'
            doNotPress = false
            startTime = performance.now()
        }, timeToWait)
    }
    else if(doNotPress) {
        infoSpan.innerText = 'You pressed too soon'
        currentAttemptSpan.innerText = 'early'
        setTimeout(() => {
            minigameArea.style.backgroundColor = 'var(--color-1)'
            minigameArea.style.color = 'black'
            infoSpan.innerText = 'Click'
            doNotPress = false
            roundStarted = false
        }, 2000)
        clearTimeout(waitingInterval)
        if(playsCount == 3)
            playerTurn.innerText = "It is now player 2's turn"
        else if(playsCount == 6) showWinner()
    }
    else {
        endTime = performance.now()
        roundStarted = false
        timeInterval = ((endTime - startTime)/1000).toPrecision(3)
        infoSpan.innerText = timeInterval + ' seconds. Click again when ready'
        currentAttemptSpan.innerText = timeInterval
        if(bestAttemptSpan.innerText === '' || Number(bestAttemptSpan.innerText) > timeInterval) {
            bestAttemptSpan.innerText = timeInterval
            if(playsCount <=3) playerOneInterval = timeInterval
            else playerTwoInterval = timeInterval
        }
        if(playsCount == 3)
            playerTurn.innerText = "It is now player 2's turn"
        else if(playsCount == 6) showWinner()
    }
}

minigameArea.addEventListener("click", () => {
    if(!singlePlayer) twoPlayerMode()
        else singlePlayerMode()
})

window.addEventListener("keydown", (e) => {
    if(e.key === ' ' && screenOverlay.style.opacity == '0') {
        if(!singlePlayer) twoPlayerMode()
        else singlePlayerMode()
    }
})

singlePlayerBtn.addEventListener("click", () => {
    playerTurn.innerText = ''
    bestAttemptSpan.innerText = ''
    currentAttemptSpan.innerText = ''
    screenOverlay.style.opacity = '0'
    screenOverlay.style.pointerEvents = 'none'
    setTimeout(() => {
        modeSelector.style.display = 'none'
    }, 301)
    singlePlayer = true
    roundStarted = false
    doNotPress = false
    minigameArea.style.backgroundColor = 'var(--color-1)'
    minigameArea.style.color = 'black'
    infoSpan.innerText = 'Click'
})

twoPlayerBtn.addEventListener("click", () => {
    screenOverlay.style.opacity = '0'
    screenOverlay.style.pointerEvents = 'none'
    setTimeout(() => {
        modeSelector.style.display = 'none'
    }, 301)
    singlePlayer = false
    bestAttemptSpan.innerText = ''
    currentAttemptSpan.innerText = ''
    playerTurn.innerText = `Player 1`
    roundStarted = false
    doNotPress = false
    minigameArea.style.backgroundColor = 'var(--color-1)'
    minigameArea.style.color = 'black'
    infoSpan.innerText = 'Click'
    playsCount = 0
})

selectModeBtn.addEventListener("click", () => {
    modeSelector.style.display = 'flex'

    screenOverlay.style.opacity = '1'
    screenOverlay.style.pointerEvents = 'auto'
})

changeGamemodeBtn.addEventListener("click", () => {
    window.location = 'index.html'
})