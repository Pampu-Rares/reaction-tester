const reactionTimeRedirectBtn = document.getElementById("reaction-time-redirect")
const targetTesterRedirectBtn = document.getElementById("target-tester-redirect")

reactionTimeRedirectBtn.addEventListener("click", () => {
    window.location = './reactionTester.html'
})

targetTesterRedirectBtn.addEventListener("click", () => {
    window.location = './targetTester.html'
})