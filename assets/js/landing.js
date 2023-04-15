var startButton = document.getElementById('startButton')
var landingTitle = document.getElementById("landing-title")
var redirectUrl = '.'
var countDown = 24
var pokemonApiPics = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
var pokemonScrollDisplay = document.getElementById('scroll');
var imgIndex = [];

startButton.addEventListener('click', function () {
    location.assign('./index.html')
})

setInterval(function () {
    landingTitle.setAttribute("class", 'movement')
}, 100)


// Function to call pokemon images and display in a scrolling banner
// Not done yet.....
function scrollPokemon() {
    fetch(pokemonApiPics)
        .then(function (response) { 
            return response.json() })
        .then(function (data) {
            for (var i = 0; i < data.results.length; i++) {
                var pokeIMG = document.createElement('img');
                pokeIMG.src = data.results[i].sprites.front_default;
                pokemonScrollDisplay.appendChild(pokeIMG);
              }
            })
            .catch(function(error) {
              console.log('Error fetching Pokemon data:', error);
            });
        }
scrollPokemon();