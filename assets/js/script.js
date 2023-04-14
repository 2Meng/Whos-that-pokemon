var dadJokesAPI = 'https://icanhazdadjoke.com/'
var generatedDadJoke = document.getElementById('dad-joke')
var dadJokeButton = document.getElementById('new-joke')

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
