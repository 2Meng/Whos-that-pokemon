var dadJokesAPI = 'https://icanhazdadjoke.com/'
var generatedDadJoke = document.getElementById('dad-joke')
var dadJokeButton = document.getElementById('new-joke')
var pokemonApi = 'https://pokeapi.co/api/v2/pokemon/'
var pokemonDisplay = document.getElementById('pokemonDisplay') //give a real ID later
var pokemonName = ''

//returns a random number with value 0-x
function randomNumGen(x) {
    return Math.floor(Math.random()* x)
}

// Runs dad jokes API
function randomDadJoke(dadJokesAPI){
    fetch(dadJokesAPI, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    generatedDadJoke.textContent = data.joke;
    });
}

dadJokeButton.addEventListener('click', function(){
    randomDadJoke(dadJokesAPI);
})

// Load Data from Pokemon API. Get Sprite, Get type? Get Evolution?
// currently creates an Image Element and attaches it to an element in the document name tempId
function loadPokemon() {
    var tempNumber = randomNumGen(151)
    fetch(pokemonApi + tempNumber) //add a number to the end of this to load a specific pokemon. use random number for random pokemon.
        .then(function(response)
        {return response.json()})
        .then(function(data){
        console.log(data)
        // Use this code if we create a new element
        pokemonName = data.name
        var pokeIMG = document.createElement('img')
        pokeIMG.src = data.sprites.front_default
        // to set color to black and white
        // pokeIMG.setAttribute('class', 'constrast-200, brightness-0)
        console.log(pokemonName)
        pokemonDisplay.appendChild(pokeIMG)
    })
}


loadPokemon()