var startButton = document.getElementById('startButton')
var landingTitle = document.getElementById("landing-title")
var difficultyIMG = document.getElementById("pokeball")
var difficultyDisplay = document.getElementById('difficulty-display')

// Modal Stuff //
var modalButton = document.getElementById('modal-btn')
var pokeModal = document.getElementById('poke-modal')
var closeSpan = document.getElementsByClassName('close')[0]

var nextButton = document.getElementById("next-button")
var prevButton = document.getElementById("prev-button")
var redirectUrl = '.'
var pokemonApi = 'https://pokeapi.co/api/v2/pokemon/';
var pokemonScrollDisplay = document.getElementById('scroll');

var difficultyValue
var imgArray = []

modalButton.addEventListener('click', function() {
    pokeModal.style.display = 'block'
})

closeSpan.addEventListener('click', function() {
    pokeModal.style.display = 'none'
})

nextButton.addEventListener('click', function() {
    if(difficultyValue<imgArray.length-1){   
        difficultyValue++
    } else {
        difficultyValue = 0
    }
    difficultyIMG.setAttribute('src', imgArray[difficultyValue])
    if(difficultyValue == 0){
        difficultyDisplay.innerHTML = "Easy Mode: Generation One Only"
    }
    if(difficultyValue == 1){
        difficultyDisplay.innerHTML = "Great Mode: Generations One-Three"
    }
    if(difficultyValue == 2){
        difficultyDisplay.innerHTML = "Ultra Mode: Generations One-Five"
    }
    if(difficultyValue == 3){
        difficultyDisplay.innerHTML = "Master Mode: All Pokemon"
    }
})

prevButton.addEventListener('click', function() {
    if(difficultyValue > 0){
        difficultyValue--
    } else {
        difficultyValue = imgArray.length-1
    }
    difficultyIMG.setAttribute('src', imgArray[difficultyValue])
    if(difficultyValue == 0){
        difficultyDisplay.innerHTML = "Easy Mode: Generation One Only"
    }
    if(difficultyValue == 1){
        difficultyDisplay.innerHTML = "Great Mode: Generations One-Three"
    }
    if(difficultyValue == 2){
        difficultyDisplay.innerHTML = "Ultra Mode: Generations One-Five"
    }
    if(difficultyValue == 3){
        difficultyDisplay.innerHTML = "Master Mode: All Pokemon"
    }
})

startButton.addEventListener('click', function () {
    localStorage.setItem("difficulty", difficultyValue)
    location.assign('./index.html')
})

setInterval(function () {
    landingTitle.setAttribute("class", 'movement')
}, 1000)

function init() {
    difficultyValue = 0
    // load images to imgArray
    imgArray[0] = './assets/photos/pokeball-16848.png'
    imgArray[1] = './assets/photos/GreatBall.png'
    imgArray[2] = './assets/photos/UltraBall.png'
    imgArray[3] = './assets/photos/MasterBall.png'
    difficultyIMG.setAttribute('src', imgArray[0])
    difficultyDisplay.innerHTML = "Easy Mode: Generation One Only"
}

// Function to call pokemon images and display in a scrolling banner. 
function fetchPokemon() {
    for (let i = 1; i < 151; i++) {
        var pokemonApiPics = pokemonApi + i;
        fetch(pokemonApiPics)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                var pokeImg = document.createElement('img')
                pokeImg.src = data.sprites.front_default
                pokemonScrollDisplay.appendChild(pokeImg)
            })
    }
} 

window.addEventListener('load', function () {
	function go() {
		i = i < width ? i + step : 1;
		m.style.marginLeft = -i + 'px';
	}
	var i = 0,
		step = 3,
		space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	var m = document.getElementById('scroll');
	var t = m.innerHTML;
	m.innerHTML = t + space;
	m.style.position = 'absolute';
	var width = (m.clientWidth + 1);
	m.style.position = '';
	m.innerHTML = t + space + t + space + t + space + t + space + t + space + t + space + t + space;
	m.addEventListener('mouseleave', function () {
		step = 3;
	}, true);
	var x = setInterval(go, 50);
}, true);

init();
fetchPokemon();