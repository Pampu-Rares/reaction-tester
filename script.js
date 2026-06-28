const minigameArea = document.getElementById("minigame-container")
const infoSpan = document.getElementById("info-span")

const singlePlayerBtn = document.getElementById("single-player")
const twoPlayerBtn = document.getElementById("2-player")

const screenOverlay = document.getElementById("screen-overlay")

const playerSpan = document.getElementById("player")

let gameStarted = false, doNotPress = false
let startTime, endTime
let player = 1, playerOneWins = 0, playerOneInterval, playerTwoWins = 0, playerTwoInterval, playsCount = 0;

function singlePlayerMode() {
    if(!gameStarted)
    {
        infoSpan.innerText = 'Click when the color turns green'
        minigameArea.style.backgroundColor = 'red'
        gameStarted = true
        doNotPress = true
        const timeToWait = (Math.random() * 2000) + 1
        setTimeout(() => {
            minigameArea.style.backgroundColor = 'greenyellow'
            infoSpan.innerText = 'Click'
            doNotPress = false
            startTime = performance.now()
        }, timeToWait)
    }
    else if(doNotPress) infoSpan.innerText = 'You pressed to soon'
    else {
        endTime = performance.now()
        timeInterval = (endTime - startTime).toPrecision(3) / 1000
        infoSpan.innerText = 'You made it: ' + timeInterval + ' seconds. Click again when ready'
        gameStarted = false

    }
}

function twoPlayerMode() {
    playsCount++
    if(!gameStarted) {
        infoSpan.innerText = 'Click when the color turns green'
        minigameArea.style.backgroundColor = 'red'
        gameStarted = true
        doNotPress = true
        const timeToWait = (Math.random() * 10000) + 1
        setTimeout(() => {
            minigameArea.style.backgroundColor = 'greenyellow'
            infoSpan.innerText = 'Click'
            doNotPress = false
            startTime = performance.now()
        }, timeToWait)
    }
    else if(doNotPress) {
        infoSpan.innerText = 'You pressed too soon'
        if(player == 2) playerOneWins++
        else playerTwoWins++
    }
    else {
        endTime = performance.now()
        timeInterval = (endTime - startTime).toPrecision(3) / 1000
        infoSpan.innerText = timeInterval + ' seconds. Click again when ready'
        gameStarted = false
        if(player == 1) playerOneInterval += timeInterval
        else playerTwoInterval += timeInterval
    }
    if(playsCount == 3) {
        player == 2;
        gameStarted = false
        doNotPress = false
        player.innerText = 2;
    }
    if(playsCount == 6) {
        playerOneInterval /= 3;
        playerTwoInterval /= 3;
        if(playerOneInterval > playerTwoInterval) playerTwoWins++;
        else playerOneWins++;
        playsCount = 0;
        player = 1;
        console.log('Score')
        console.log('Player 1:' + playerOneWins)
        console.log('Player 2: ' + playerTwoWins)
    }
}

minigameArea.addEventListener("click", () => {
    if(!singlePlayer) twoPlayerMode()
        else singlePlayerMode()
})

singlePlayerBtn.addEventListener("click", () => {
    screenOverlay.style.opacity = '0'
    screenOverlay.style.pointerEvents = 'none'
    singlePlayer = true
})

twoPlayerBtn.addEventListener("click", () => {
    screenOverlay.style.opacity = '0'
    screenOverlay.style.pointerEvents = 'none'
    singlePlayer = false
})