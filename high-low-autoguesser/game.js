const output = document.querySelector('output');
const too_low = document.querySelector('#too_low');
const too_high = document.querySelector('#too_high');
const correct = document.querySelector('#correct');

let guess_count;
let delay = 1000;

let low = 1;
let high = 1000;
let guess = 500;

function new_game() {
    guess_count = 0;
    make_guess();
}

function make_guess() {
    guess = Math.floor((low + high)/2);
    output.textContent = guess;
    guess_count++;
}

too_low.addEventListener('click', () => {
    low = guess;
    make_guess();
});

too_high.addEventListener('click', () => {
    high = guess;
    make_guess();
});

correct.addEventListener('click', () => {
    output.textContent = `I got it in ${guess_count} guesses!`;
    show_confetti();
})

function show_confetti() {
    party.confetti(output, {
        count: party.variation.range(1000, 20000),
        shapes: ["star", "roundedSquare"],
    });
}

new_game();
