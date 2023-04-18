// pokemon STATS //
var pokemonStats = document.getElementById('pokemon-stats');
var pokemonID = document.getElementById('pokemon-id');
var pokemonHeight = document.getElementById('height');
var pokemonWeight = document.getElementById('weight');
var pokemonType = document.getElementById('type');

// in-game UI // 
var ingameUI = document.getElementById('ingame-ui');
var actualGame = document.getElementById('game');
var startGameBtn = document.getElementById('start-game');
var userHP = document.getElementById('user-health-points');
var blankWordSpace = document.getElementById('letters-blanks');
var incorrectLettersEl = document.getElementById('incorrect-letters')
var playerMessage = document.getElementById('player-message');
var displayHintBtn = document.getElementById('display-hint');
var hintMessage = document.getElementById('hint');
var countdown = document.getElementById('countdown');
var randomPokemon = document.getElementById('guess-the-pokemon');
var userScore = document.getElementById('user-score');

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
var timerCount = 30;
var healthPoints = 50;
var incorrectKeyGuesses = 0;
var previousGuessedPokemon = [];
var isLoadingPokemon = false;
var scoreArray = [];


// Displays blanks for the user to guess Pokemon // 
var blankLetters = [];
var guessPokemon = [];
var incorrectLetters = [];

// userHP.textContent = 'Player HP: ' + healthPoints + 'HP';

actualGame.style.display = 'none';

startGameBtn.addEventListener('click', function(){
    loadPokemon()
    handleUserHP()
    clockTimer ()
    actualGame.style.display = '';
    startGameBtn.style.display = 'none';
})

//returns a random number with value 0-x
function randomNumGen(x) {
    return Math.floor(Math.random()* x);
}

// Load Data from Pokemon API. Get Sprite, Get type? Get Evolution?
// currently creates an Image Element and attaches it to an element in the document name tempId
function loadPokemon() {
    if (isLoadingPokemon){
        // Checks if a request has been made - if so then will not request more than once //
        return;
    }

    isLoadingPokemon = true;
    
    var pokemonGeneration = randomNumGen(151);
    while (previousGuessedPokemon.includes(pokemonGeneration) || pokemonGeneration === 0) {
        pokemonGeneration = randomNumGen(151);
    }
    previousGuessedPokemon.push(pokemonGeneration);
    console.log(previousGuessedPokemon)

    fetch(pokemonApi + pokemonGeneration) 
        // Add a number to the end of this to load a specific pokemon. use random number for random pokemon. 

        .then(function(response)
        {return response.json()})

        .then(function(data){
        // Use this code if we create a new element 
        pokemonName = data.name
        var pokeIMG = document.createElement('img')
        pokeIMG.src = data.sprites.front_default

        // To set color to black and white
        pokeIMG.setAttribute('class', 'constrast-200, brightness-0')
        randomPokemon.appendChild(pokeIMG)
        isLoadingPokemon = false;
        
        console.log(data)
        console.log(pokemonName)
        renderBlanks(pokemonName)
        })
        .catch(function(error){
        console.log('Error fetching Pokemon data:', error);
        isLoadingPokemon = false;
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

        if(blankLetters.join('') === gameBlanks){
            playerMessage.textContent = 'Congrats! Its ' + pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) + '!';
            scoreCounter ++;
            timerCount += 5;
            setTimeout(nextPokemon, 2000);
        }

    } 
    if (!letterInWord) {
        guessPokemon.push(letters);
        incorrectLetters.push(letters);
        playerMessage.textContent = 'Oops! Looks like that letter isnt in the Pokemons name! Try Again!';
        incorrectLettersEl.textContent = incorrectLetters.join(', ');

        setTimeout(function(){
            playerMessage.textContent = '';
        },1250);

        if (guessPokemon.length === 10) {
            playerMessage.textContent = 'Oh no! The Pokemons name was.. ' + pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) + '! Try again!';
            scoreCounter --;
            timerCount -= 5;
            setTimeout(nextPokemon, 2000);
        }

        // Counts the number of incorrect characters guessed //
        incorrectKeyGuesses = incorrectLetters.length;
    }
};

// Event listener for keys pressed //
document.addEventListener('keydown', function(event){
    // Converts the keys pressed to lower case letters //
    var key = event.key.toLowerCase();
    var availableCharacters = 'abcdefghijklmnopqrstuvwxyz123456789-'.split('');
    
    // If statement for letters pushed //

    if(availableCharacters.includes(key)){
        var pressedLetter = event.key;
        checksLetters(pressedLetter)
    }
});

function nextPokemon(){
    // Resets game elements // 
    randomPokemon.innerHTML = '';
    blankWordSpace.textContent = '';
    playerMessage.textContent = '';
    guessPokemon = [];
    incorrectLettersEl.textContent = '';
    incorrectLetters = [];
    loadPokemon()

    // Subtracts the number of incorrect key characters pressed //
    handleUserHP()
}

function handleUserHP(){
    healthPoints -= incorrectKeyGuesses
    
    userHP.textContent = 'Player HP: ' + healthPoints + 'HP'
    userHP.style.width = healthPoints + '%';

    // Should reset guesses //
    incorrectKeyGuesses = 0
    if (healthPoints === 0 || healthPoints < 0){
        endGame()
    }
}

function clockTimer (){
    timer = setInterval(function(){
        timerCount --
        countdown.textContent = 'Time left: ' + timerCount;

        if(timerCount === 0) {
            clearInterval(timer);
            endGame()
        }
    }, 1000);
}

function endGame (){
    ingameUI.textContent = 'GAME OVER!';
    userScore.textContent = 'Your score!: ' + scoreCounter;

    scoreArray.push(scoreCounter)
    localStorage.setItem('endscore', scoreArray);
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
};