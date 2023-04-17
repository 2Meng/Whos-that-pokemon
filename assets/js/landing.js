var startButton = document.getElementById('startButton')
var landingTitle = document.getElementById("landing-title")
var redirectUrl = '.'
var pokemonApi = 'https://pokeapi.co/api/v2/pokemon/';
var pokemonScrollDisplay = document.getElementById('scroll');

startButton.addEventListener('click', function () {
    location.assign('./index.html')
})

setInterval(function () {
    landingTitle.setAttribute("class", 'movement')
}, 100)


// Function to call pokemon images and display in a scrolling banner. 
function fetchPokemon() {
    for (let i = 1; i < 152; i++) {
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

fetchPokemon();