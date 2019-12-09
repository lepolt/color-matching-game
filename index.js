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
    
    if (redSlider) {
        redSlider.addEventListener('input', (event) => {
            red = parseInt(event.target.value, 10);
            updateColorBlock();
          });      
    }
    if (greenSlider) {
        greenSlider.addEventListener('input', (event) => {
            green = parseInt(event.target.value, 10);
            updateColorBlock();
        });    
    }
    if (blueSlider) {
        blueSlider.addEventListener('input', (event) => {
            blue = parseInt(event.target.value, 10);
            updateColorBlock();
        });    
    }

    newGame()
    updateColorBlock();
}

/**
 * Updates our color block with a value based on the sliders
 */
function updateColorBlock() {
    if (colorBlock) {
        colorBlock.style = buildBlockStyle(red, green, blue);
    }
}

/**
 * Updates our random color block with a random RGB value
 */
function updateRandomBlock() {
    let red = getRandomInt(255);
    let green = getRandomInt(255);
    let blue = getRandomInt(255);

    randomColor = {red, green, blue}
    let matchBlock = document.getElementById('match-block');
    if (matchBlock) {

        matchBlock.style = buildBlockStyle(red, green, blue);
    }
}

function buildBlockStyle(red, green, blue) {
    let background = `background-color: rgb(${red}, ${green}, ${blue})`;
    let boxShadow = `box-shadow: 0 0 5px rgb(${red}, ${green}, ${blue})`;
    return `${background}; ${boxShadow}`;
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

    if (redSlider) {
        redSlider.value = red;
    }
    if (greenSlider) {
        greenSlider.value = green;
    }
    if (blueSlider) {
        blueSlider.value = blue;
    }
    
    resetTimer();
    updateTimer();

    var el = document.getElementById('score') 
    if (el) {
        el.innerText = ''
    }
    updateRandomBlock();
    updateColorBlock();
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
    let el = document.getElementById('score')
    if (el) {
        el.innerText = `Your score: ${score}`;
    }
    disableControls();
}

function disableControls() {
    var redSlider = document.getElementById('red-slider');
    var greenSlider = document.getElementById('green-slider');
    var blueSlider = document.getElementById('blue-slider');

    if (redSlider) {
        redSlider.setAttribute('disabled', true);
    }
    if (greenSlider) {
        greenSlider.setAttribute('disabled', true);
    }
    if (blueSlider) {
        blueSlider.setAttribute('disabled', true);
    }
    
    if (scoreButton) {
        scoreButton.setAttribute('disabled', true);
    }
}

function enableControls() {
    var redSlider = document.getElementById('red-slider');
    var greenSlider = document.getElementById('green-slider');
    var blueSlider = document.getElementById('blue-slider');

    if (redSlider) {
        redSlider.removeAttribute('disabled');
    }
    if (greenSlider) {
        greenSlider.removeAttribute('disabled');
    }
    if (blueSlider) {
        blueSlider.removeAttribute('disabled');
    }

    if (scoreButton) {
        scoreButton.removeAttribute('disabled');
    }
}