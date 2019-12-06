let redSlider
let greenSlider
let blueSlider

let red
let green
let blue

function init() {
    redSlider = document.querySelector('#red-slider');
    greenSlider = document.querySelector('#green-slider');
    blueSlider = document.querySelector('#blue-slider');
    
    red = 127;
    green = 127; 
    blue = 127;

    redSlider.value = red;
    greenSlider.value = green;
    blueSlider.value = blue;

    
    redSlider.addEventListener('input', (event) => {
      console.log(`Red ${event.target.value}`);
      red = parseInt(event.target.value, 10);
      updateColorBlock();
    });
    greenSlider.addEventListener('input', (event) => {
        console.log(`Green ${event.target.value}`);
        green = parseInt(event.target.value, 10);
        updateColorBlock();
    });
    blueSlider.addEventListener('input', (event) => {
        console.log(`Blue ${event.target.value}`);
        blue = parseInt(event.target.value, 10);
        updateColorBlock();
    });
    
    updateRandomBlock();
    updateColorBlock();
}

function updateColorBlock() {
    let block = document.getElementById('color-block');
    block.style = `background-color: rgba(${red}, ${green}, ${blue}, 1)`;
}

function updateRandomBlock() {
    let red = getRandomInt(255)
    let green = getRandomInt(255)
    let blue = getRandomInt(255)

    let block = document.getElementById('match-block');
    block.style = `background-color: rgba(${red}, ${green}, ${blue}, 1)`;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function newGame() {
    init();
}

window.addEventListener('DOMContentLoaded', e => {
    console.log("hi");
    init();
})

