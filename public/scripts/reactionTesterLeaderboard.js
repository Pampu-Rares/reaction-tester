const leaderboardDiv = document.getElementById("leaderboard")
const newEntryDialog = document.querySelector("dialog")
const timeSpan = document.getElementById("time-span")
const submitEntryBtn = document.getElementById("submit-leaderboard-entry")
const nameInput = document.getElementById("new-entry-name")

let leaderboardEntries = []

async function getLeaderboard() {
    try {
        let htmlTableString = '<tbody>'
        leaderboardEntries = await fetch('/reactionTime/')
        leaderboardEntries = await leaderboardEntries.json()
        leaderboardEntries = leaderboardEntries.leaderboard
        leaderboardEntries.forEach((position, index) => {
        htmlTableString += `
        <tr>
            <th>${index + 1}</th>
            <td>${position.username}</td>
            <td>${position.time}</td>
        </tr>`
        })
        htmlTableString += '</tbody>'
        leaderboardDiv.innerHTML += htmlTableString
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
    newEntryDialog.showModal()
}



async function enterEntry() {
    if(!(String(nameInput.value).trim().length)) {
        alert("You need to fill in your name")
        console.log(nameInput.value, String(nameInput.value).trim)
    } else {
        enterNewRecord(nameInput.value, timeSpan.innerText)
        timeSpan.value = ''
        newEntryDialog.close()
    }
}


submitEntryBtn.addEventListener("click", enterEntry)

getLeaderboard()