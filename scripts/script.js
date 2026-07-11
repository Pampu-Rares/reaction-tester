const reactionTimeRedirectBtn = document.getElementById("reaction-time")
const targetTesterRedirectBtn = document.getElementById("target-tester")

reactionTimeRedirectBtn.addEventListener("click", () => {
    window.location = './reactionTester.html'
})

targetTesterRedirectBtn.addEventListener("click", () => {
    window.location = './targetTester.html'
})