document.querySelector("#pikachu").addEventListener("click", makeReq)
document.querySelector("#geodude").addEventListener("click", makeReq)
document.querySelector("#squirtle").addEventListener("click", makeReq)
document
    .querySelector(".game-counter-btn")
    .addEventListener("click", clearLocalStorageHistory)
const gameCounter = document.querySelector(".game-counter")

// runs at start to render game counter data to the screen
renderGameCounter()

async function makeReq(e) {
    // check if there is local storage for the game, if not create it
    checkForGameCounter()

    const userPick = e.target.id
    const res = await fetch(`/api?pokemon=${userPick}`)
    const data = await res.json()

    console.log(data)

    // get gamesWon and gamesPlayed from local storage
    let gamesWon = JSON.parse(localStorage.getItem("gamesWon"))
    let gamesPlayed = JSON.parse(localStorage.getItem("gamesPlayed"))

    document.querySelector("#game-throws").textContent = data.throwMessage
    document.querySelector("#win-or-lose").textContent = data.winOrLoseMessage

    // checks if a game was played by seeing if win-or-lose h2 has content, if it does we add 1 to gamesPlayed variable and then put that value into local storage
    if (document.querySelector("#win-or-lose").textContent) {
        gamesPlayed++
        gamesPlayed = localStorage.setItem(
            "gamesPlayed",
            JSON.stringify(gamesPlayed)
        )
    }

    // checks if win-or-lose h2 has the "won!" string in it.  If it does then increment the gamesWon variable and put that into local storage
    if (
        document.querySelector("#win-or-lose").textContent.search("won!") !== -1
    ) {
        gamesWon++
        gamesWon = localStorage.setItem("gamesWon", JSON.stringify(gamesWon))
    }

    // renders the new gamesPlayed and gamesWon values to the screen
    renderGameCounter()
}

// check if there is a game counter in local storage, if not it creates it and sets it to 0
function checkForGameCounter() {
    if (localStorage.getItem("gamesPlayed") == null) {
        localStorage.setItem("gamesWon", "0")
        localStorage.setItem("gamesPlayed", "0")
    }
}

// renders the new gamesPlayed and gamesWon values to the screen
function renderGameCounter() {
    gameCounter.textContent = `Games Won: ${localStorage.getItem(
        "gamesWon"
    )}, Games Played: ${localStorage.getItem("gamesPlayed")}`
}

// clears local storage and then sets it to 0 using checkForGameCounter and then renders it using renderGameCounter
function clearLocalStorageHistory() {
    localStorage.clear()
    checkForGameCounter()
    renderGameCounter()
}
