let redSlider = null;
let greenSlider = null;
let blueSlider = null;
let red = null;
let green = null;
let blue = null;
let randomColor = null;
let timer = null;
let seconds = 0;
let colorBlock = null;
let scoreButton = null;

function init() {
    colorBlock = document.getElementById('color-block');
    scoreButton = document.getElementById('score-button');

    redSlider = document.querySelector('#red-slider');
    greenSlider = document.querySelector('#green-slider');
    blueSlider = document.querySelector('#blue-slider');
    
    redSlider.addEventListener('input', (event) => {
      red = parseInt(event.target.value, 10);
      updateColorBlock();
    });
    greenSlider.addEventListener('input', (event) => {
        green = parseInt(event.target.value, 10);
        updateColorBlock();
    });
    blueSlider.addEventListener('input', (event) => {
        blue = parseInt(event.target.value, 10);
        updateColorBlock();
    });

    newGame()
    updateColorBlock();
}

/**
 * Updates our color block with a value based on the sliders
 */
function updateColorBlock() {
    colorBlock.style = `background-color: rgba(${red}, ${green}, ${blue}, 1)`;
}

/**
 * Updates our random color block with a random RGB value
 */
function updateRandomBlock() {
    let red = getRandomInt(255);
    let green = getRandomInt(255);
    let blue = getRandomInt(255);

    randomColor = {red, green, blue}
    let block = document.getElementById('match-block');
    block.style = `background-color: rgb(${red}, ${green}, ${blue})`;
}

/**
 * Returns a random number between 0 and max
 * @param {Int} max 
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Resets the game
 */
function newGame() {
    red = 127;
    green = 127; 
    blue = 127;

    redSlider.value = red;
    greenSlider.value = green;
    blueSlider.value = blue;

    resetTimer();
    updateTimer();

    document.getElementById('score').innerText = ''
    updateRandomBlock();
    enableControls();
}

function resetTimer() {
    seconds = 0;
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        seconds++;
        updateTimer();
    }, 1000);
}

function updateTimer() {
    var el = document.getElementById('timer');
    if (el) {
        el.innerText = `${seconds} seconds`;
    }
}

function calculateScore() {
    if (!randomColor) {
        return;
    }

    var rDiff = (red / 255) - (randomColor.red / 255);
    var gDiff = (green / 255) - (randomColor.green / 255);
    var bDiff = (blue / 255) - (randomColor.blue / 255);
    var diff = Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);

    var score = Math.round((1.0 - diff) * 100.0 + 0.5);
    console.log(score);

    clearInterval(timer);
    updateTimer();
    document.getElementById('score').innerText = `Your score: ${score}`;
    disableControls();
}

function disableControls() {
    var redSlider = document.getElementById('red-slider');
    var greenSlider = document.getElementById('green-slider');
    var blueSlider = document.getElementById('blue-slider');

    redSlider.setAttribute('disabled', true);
    greenSlider.setAttribute('disabled', true);
    blueSlider.setAttribute('disabled', true);

    scoreButton.setAttribute('disabled', true);
}

function enableControls() {
    var redSlider = document.getElementById('red-slider');
    var greenSlider = document.getElementById('green-slider');
    var blueSlider = document.getElementById('blue-slider');

    redSlider.removeAttribute('disabled');
    greenSlider.removeAttribute('disabled');
    blueSlider.removeAttribute('disabled');

    scoreButton.removeAttribute('disabled');
}