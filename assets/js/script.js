// DadJokes API // 
var dadJokesAPI = 'https://icanhazdadjoke.com/';
var generatedDadJoke = document.getElementById('dad-joke');

// Pokemon API //
var pokemonApi = 'https://pokeapi.co/api/v2/pokemon/';
var pokemonName = '';

// In-game UI // 
var ingameUI = document.getElementById('ingame-ui');
var actualGame = document.getElementById('game');
var userHP = document.getElementById('user-health-points');
var healthText = document.getElementById('health-text');
var blankWordSpace = document.getElementById('letters-blanks');
var incorrectLettersEl = document.getElementById('incorrect-letters')
var playerMessage = document.getElementById('player-message');
var countdown = document.getElementById('countdown');
var randomPokemon = document.getElementById('guess-the-pokemon');
var userScore = document.getElementById('user-score');

// Pokemon HINT/STATS //
var displayHintBtn = document.getElementById('display-hint');
var hintMessage = document.getElementById('hint');
var pokemonStats = document.getElementById('pokemon-stats');
var pokemonID = document.getElementById('pokemon-id');
var pokemonHeight = document.getElementById('height');
var pokemonWeight = document.getElementById('weight');
var pokemonType = document.getElementById('type');

// Variables for the game //
var gameBlanks = "";
var numberOfBlanks = 0;
var scoreCounter = 0;
var timer;
var timerCount = 999999;
var healthPoints;
var incorrectKeyGuesses = 0;
var previousGuessedPokemon = [];
var isLoadingPokemon = false;
var pokemonHasBeenGuessed = false;
var scoreArray = [];

// Blanks for the user to guess Pokemon // 
var blankLetters = [];
var guessPokemon = [];
var incorrectLetters = [];

// Variables from Local Storage for difficulty //
var difficulty = localStorage.getItem("difficulty")
var selectedDifficulty;
if (difficulty == 0){
    healthPoints = 100;
    // GEN 1 //
    selectedDifficulty = 151;
} else if (difficulty == 1){
    healthPoints = 75;
    // GEN 1 - 3 //
    selectedDifficulty = 386;
} else if (difficulty == 2){
    healthPoints = 50;
    // GEN 1 - 5 //
    selectedDifficulty = 649
} else if (difficulty == 3){
    healthPoints = 25;
    // GEN 1 - 8 //
    selectedDifficulty = 905
}

// Starts game //
function initGame (){
    loadPokemon()
    handleUserHP()
    clockTimer ()
}

// Returns a random number/Pokemon within the number scope set //
function randomNumGen(x) {
  return Math.floor(Math.random() * x);
}

// Load Data from Pokemon API. Get Sprite, Get type? Get Evolution?
// currently creates an Image Element and attaches it to an element in the document name tempId
function loadPokemon() {
    var pokemonGeneration = randomNumGen(selectedDifficulty)
    randomPokemon.innerHTML = '';
    isLoadingPokemon = true;
    fetch(pokemonApi + pokemonGeneration)

    .then(function (response) {
      return response.json();
    })

        .then(function(data){
        pokemonName = data.name
        var pokeIMG = document.createElement('img')
        pokeIMG.src = data.sprites.front_default
        // diplay stats
        pokemonID = document.createElement("li")
        pokemonHeight = document.createElement("li")
        pokemonWeight = document.createElement("li")
        pokemonType = document.createElement("li")
        pokemonStats.textContent = "POKÉMON STATS"
        pokemonID.textContent = "ID: " + data.id
        pokemonHeight.textContent = "HEIGHT: " + data.height
        pokemonWeight.textContent = "WEIGHT: " + data.weight
        pokemonType.textContent = "TYPE: " + data.types[0].type.name
        pokemonStats.append(pokemonID, pokemonHeight, pokemonWeight, pokemonType)

        // to set color to black and white
        // pokeIMG.setAttribute('class', 'constrast-200, brightness-0)
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

function renderBlanks(pokemonName) {
  // Randomly picks a Pokemon and inserts names to the array for user to guess //
  gameBlanks = pokemonName.toLowerCase();
  blankLetters = gameBlanks.split("");
  numberOfBlanks = blankLetters.length;
  blankLetters = [];
  // Loop to push blanks to the blankLetters array //
  for (var i = 0; i < numberOfBlanks; i++) {
    blankLetters.push("_");
  }
  // //
  blankWordSpace.textContent = blankLetters.join(" ");
}

// Function to check the letters pressed in Event listener //
function checksLetters(letters) {
  var letterInWord = false;
  for (var i = 0; i < numberOfBlanks; i++) {
    if (gameBlanks[i] === letters) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var j = 0; j < numberOfBlanks; j++) {
      if (gameBlanks[j] === letters) {
        blankLetters[j] = letters;
      }
    }
    blankWordSpace.textContent = blankLetters.join(" ");

        if(blankLetters.join('') === gameBlanks){
            playerMessage.textContent = 'Congrats! Its ' + pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) + '!';
            scoreCounter ++;
            timerCount += 5;
            pokemonHasBeenGuessed = true;
            setTimeout(nextPokemon, 2000);
        }

    } 
    if (!letterInWord) {
        guessPokemon.push(letters);
        incorrectLetters.push(letters);
        playerMessage.textContent = 'Oops! Looks like that letter isnt in the Pokemons name! Try Again!';
        incorrectLettersEl.textContent = incorrectLetters.join(', ');

    setTimeout(function () {
      playerMessage.textContent = "";
    }, 1250);

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

// Event listener for keys presses //
document.addEventListener('keyup', function(event){
    // Converts the keys pressed to lower case letters //
    var key = event.key.toLowerCase();
    var availableCharacters = 'abcdefghijklmnopqrstuvwxyz123456789-'.split('');
    
    // If statement for letters pushed //

    if(availableCharacters.includes(key)){
        if(pokemonHasBeenGuessed){
            return;
        }
        var pressedLetter = event.key;
        checksLetters(pressedLetter)
    }
});

function nextPokemon(){
    // Resets game elements for next Pokemon // 
    randomPokemon.innerHTML = '';
    blankWordSpace.textContent = '';
    playerMessage.textContent = '';
    guessPokemon = [];
    incorrectLettersEl.textContent = '';
    incorrectLetters = [];
    pokemonHasBeenGuessed = false;
    loadPokemon()
    handleUserHP()
}

function handleUserHP(){
    // Subtracts points from user HP per incorrect key guesses //
    healthPoints -= incorrectKeyGuesses
    var maxHealth = 100;
    var healthPercentage = Math.max(0, healthPoints) / maxHealth
    healthText.textContent = 'Player HP: ' + healthPoints + 'HP'
    userHP.style.width = (healthPercentage * 100) + '%';

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

displayHintBtn.addEventListener('click', function (){

})

function endGame (){
    ingameUI.textContent = 'GAME OVER!';
    userScore.textContent = 'Your score!: ' + scoreCounter;

    scoreArray.push(scoreCounter)
    localStorage.setItem('endscore', scoreArray);
}

initGame ()

// Runs dad jokes API
function randomDadJoke(dadJokesAPI) {
  fetch(dadJokesAPI, {
    headers: {
      Accept: "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      generatedDadJoke.textContent = data.joke;
    });
}



// Open the modal
function openModal() {
  modal.classList.add("open");
}

// Close the modal
function closeModal() {
  modal.classList.remove("open");
}



// Open the modal and load API data
function openModal() {
  modal.style.display = "block"; // Make API request

  fetch("https://icanhazdadjoke.com/")
    .then((response) => response.json())
    .then((data) => {
      // Populate modal data container with API data
      modalData.innerHTML = `https://icanhazdadjoke.com/`
        <p>${data.title}</p>
        <img src="${data.image}" alt="${data.title}">
        <p>${data.description}</p>
      `;
    })
    .catch((error) => console.error(error));
}

// Close the modal
function closeModal() {
  modal.style.display = "none";
}


