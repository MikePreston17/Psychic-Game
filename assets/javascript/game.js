/*	Author: Michael Preston
 *	Date: "09-30-2018"
 */

/* GLOBALS
 */
var wins, losses, answer, guessesLeft,
    guessList,
    MAX_GUESSES = 9;
var letters = alphabet();

/*Listeners
 */
window.addEventListener('load', init)

function init() {
    setCPUAnswer();
    guessList = [];
    guessesLeft = MAX_GUESSES;
    wins = losses = 0;

    $('prompt').innerText = "Guess what letter I'm thinking of"
    render()
}

function render() {
    $('guesses-remaining').innerText = 'Guesses Left: ' + guessesLeft;
    $('losses').innerText = 'Losses: ' + losses;
    $('wins').innerText = 'Wins: ' + wins;
    $('player-guesses').innerText = "Your guesses so far: " + guessList.join(", ");
}

document.onkeyup = function (event) {
    guess = event.key.toLowerCase();
    determineWinner(guess);
}

function determineWinner(guess) {

    //<< Fails >>
    if (guess === 'f5')
        return;
    if (!letters.includes(guess)) {
        alert('That\'s not even a letter...')
        return;
    }
    if (guessList.includes(guess)) {
        alert('Seriously?  You already picked that one!');
        return;
    }

    guessesLeft--;
    guessList.push(guess);

    // <<game logic>
    (guess === answer && guessesLeft >= 0) ?
    handleWin(): (guessesLeft <= 0) ?
        handleLoss() :
        render()
}

function handleLoss() {
    losses++;
    alert('You LOST!');
    restart()
}

function handleWin() {
    wins++;
    alert('You win!');
    restart();
}

function generateCharArray(first, last) {
    var array = [],
        i = first.charCodeAt(0),
        j = last.charCodeAt(0);
    for (; i <= j; ++i) {
        array.push(String.fromCharCode(i))
    }
    return array;
}

function alphabet() {
    return generateCharArray('a', 'z');
}

function randomInt(min, max, inclusive) {
    return (inclusive) ? Math.floor(Math.random() * (max - min + 1)) + min :
        Math.floor(Math.random() * (max - min)) + min;
}

function getRandom(list) {
    return list[randomInt(0, 26)];
}

function restart() {
    setCPUAnswer();
    guessesLeft = MAX_GUESSES;
    guessList = [];
    render();
}

function setCPUAnswer() {
    answer = getRandom(letters);
    console.log('super secret answer: ', answer); //(PSST!)
}

function $(elementId) {
    return !elementId ?
        new Error('Element Id cannot be undefined! ' + elementId) :
        document.getElementById(elementId)
}