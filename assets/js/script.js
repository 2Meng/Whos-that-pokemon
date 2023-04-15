// pokemon STATS //
var pokemonStats = document.getElementById('pokemon-stats');
var pokemonID = document.getElementById('pokemon-id');
var pokemonHeight = document.getElementById('height');
var pokemonWeight = document.getElementById('weight');
var pokemonType = document.getElementById('type');

// in-game UI // 
var blankWordSpace = document.getElementById('letters-blanks');
var playerMessage = document.getElementById('player-message');
var displayHintBtn = document.getElementById('display-hint');
var hintMessage = document.getElementById('hint');
var countdown = document.getElementById('countdown');
var randomPokemon = document.getElementById('guess-the-pokemon');

// DadJokes API // 
var dadJokesAPI = 'https://icanhazdadjoke.com/';
var generatedDadJoke = document.getElementById('dad-joke');
// var dadJokeButton = document.getElementById('new-joke')

// Pokemon API //
var pokemonApi = 'https://pokeapi.co/api/v2/pokemon/';
var pokemonDisplay = document.getElementById('mainGame'); //give a real ID later
var pokemonName = '';

// Variables for the game //
var gameBlanks = '';
var numberOfBlanks = 0;
var scoreCounter = 0;
var timer;
var timerCount;

// Displays blanks for the user to guess Pokemon // 
var blankLetters = [];
var guessPokemon = [];


//returns a random number with value 0-x
function randomNumGen(x) {
    return Math.floor(Math.random()* x);
}

// Load Data from Pokemon API. Get Sprite, Get type? Get Evolution?
// currently creates an Image Element and attaches it to an element in the document name tempId
function loadPokemon() {
    var pokemonGeneration = randomNumGen(151)
    fetch(pokemonApi + pokemonGeneration) 
        //add a number to the end of this to load a specific pokemon. use random number for random pokemon.

        .then(function(response)
        {return response.json()})

        .then(function(data){
        // Use this code if we create a new element
        pokemonName = data.name
        var pokeIMG = document.createElement('img')
        pokeIMG.src = data.sprites.front_default

        // to set color to black and white
        // pokeIMG.setAttribute('class', 'constrast-200, brightness-0)
        randomPokemon.appendChild(pokeIMG)
        console.log(data)
        //console.log(pokemonName)
        renderBlanks(pokemonName)
    })
    .catch(function(error){
        console.log('Error fetching Pokemon data:', error);
    });
}

function renderBlanks(pokemonName){
    // Randomly picks a Pokemon and inserts names to the array for user to guess //
    gameBlanks = pokemonName.toLowerCase();
    blankLetters = gameBlanks.split('');
    numberOfBlanks = blankLetters.length;
    blankLetters = [];
    // Loop to push blanks to the blankLetters array //
    for (var i = 0; i < numberOfBlanks; i++){
        blankLetters.push('_');
    }
    // //
    blankWordSpace.textContent = blankLetters.join(' ');
}

// Function to check the letters pressed in Event listener //
function checksLetters(letters){
    var letterInWord = false;
    for(var i = 0; i < numberOfBlanks; i++){
        if (gameBlanks[i] === letters) {
            letterInWord = true;
        }
    }
    if (letterInWord){
        for(var j = 0; j < numberOfBlanks; j++){
            if (gameBlanks[j] === letters){
                blankLetters[j] = letters;
            }
        }
        blankWordSpace.textContent = blankLetters.join(' ');
    }
};

// Event listener for keys pressed //
document.addEventListener('keydown', function(event){
    // Converts the keys pressed to lower case letters //
    var key = event.key.toLowerCase();
    var alphabetCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    
    // If statement for letters pushed //

    if(alphabetCharacters.includes(key)){
        var pressedLetter = event.key;
        checksLetters(pressedLetter)
    }
    console.log('yes')

});




loadPokemon()


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
};