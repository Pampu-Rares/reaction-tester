const leaderboardDiv = document.getElementById("leaderboard")
const newEntryDialog = document.querySelector("dialog")
const timeSpan = document.getElementById("time-span")
const submitEntryBtn = document.getElementById("submit-leaderboard-entry")
const nameInput = document.getElementById("new-entry-name")

let leaderboardEntries = []

async function getLeaderboard() {
    try {
        leaderboardDiv.innerHTML = ''
        leaderboardEntries = await fetch('/reactionTime/')
        leaderboardEntries = await leaderboardEntries.json()
        leaderboardEntries = leaderboardEntries.leaderboard
        leaderboardEntries.forEach(position => {
        leaderboardDiv.innerHTML += `
        <tr>
            <th>${position.username}</th>
            <td>${position.time}</td>
        <tr>`
        })
    } catch(err) {
        leaderboardDiv.innerHTML = '<p>' + err.message + '</p'
    }
}

async function enterNewRecord(username, time) {
    leaderboardDiv.innerHTML = ''
    fetch('/reactionTime/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            time
        })
    }).then(() => {getLeaderboard()})
    .catch(err => leaderboardDiv.innerHTML = '<p>' + err.message + '</p>')
}

function askForLeaderboardEntry(time) {
    timeSpan.innerText = time
    newEntryDialog.show()
}



async function enterEntry() {
    enterNewRecord(nameInput.value, timeSpan.innerText)
    timeSpan.innerText = ''
    newEntryDialog.close()
}


submitEntryBtn.addEventListener("click", enterEntry)

getLeaderboard()