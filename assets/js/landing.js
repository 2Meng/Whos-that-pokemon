var startButton = document.getElementById('startButton')
var landingTitle = document.getElementById("landing-title")
var redirectUrl = '.'
var countDown = 24
startButton.addEventListener('click', function() {
    location.assign('./index.html')
})

setInterval(function(){
    landingTitle.setAttribute("class", 'movement')
}, 100)