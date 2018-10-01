/*	Author: Michael Preston
 *	Date: "09-30-2018"
 */


/* GLOBALS
 */

var wins, losses, guess, answer, guessesLeft,
    guessList, MAX_GUESSES = 3;
var letters = alphabet();

window.addEventListener('load', init)

function init() {
    setAnswer();
    guessList = [];
    guessesLeft = MAX_GUESSES;
    wins = losses = 0;

    $('prompt').innerText = "Guess what letter I'm thinking of"
    render()
}

function render() {
    // console.log('called render()');
    $('guesses-remaining').innerText = 'Guesses Left: ' + guessesLeft;
    $('losses').innerText = 'Losses: ' + losses;
    $('wins').innerText = 'Wins: ' + wins;
}

document.onkeyup = function (event) {

    let win = false;
    guess = event.key.toLowerCase();

    if (guess === 'f5') return;

    if (!letters.includes(guess)) {
        alert('That\'s not even a letter...')
        return;
    }

    guessesLeft--;
    guessList.push(guess);

    console.log('guess: ', guess);

    console.log('remaining guesses', guessesLeft);

    if (guess == answer) {
        if (guessesLeft >= 0) {
            wins++
            alert('You win!');
            console.log('You win!');
        }
        render();
        restart();
    } else {
        losses++;
        alert('You LOST!');
        render()
        restart()
    }
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
    setAnswer();
    guessesLeft = MAX_GUESSES;
    $('guesses-remaining').innerText = 'Guesses Left: ' + guessesLeft;
    console.log('restart()');
}

function setAnswer() {
    console.log('', letters);
    answer = getRandom(letters);
    console.log('super secret answer: ', answer); //(PSST!)
}

function $(elementId) {
    return !elementId ?
        new Error('Element Id cannot be undefined! ' + elementId) :
        document.getElementById(elementId)
}