const guess_input = document.querySelector("input");
const output = document.querySelector("output");
const guess_button = document.querySelector("button");

let the_number;
let guess_count;
let timeout;

function new_game() {
    guess_count = 0;
    guess_input.value = null;
    the_number = 1 + Math.floor(Math.random() * 1000);
    await_guess();
}

function await_guess() {
    guess_input.focus();
    output.textContent = "🤓 Mwahaha! Good luck!";
}

function check_guess() {
    const number = parseInt(guess_input.value, 10);

    ++guess_count;

    clearTimeout(timeout);

    if (isNaN(number)) {
        output.textContent = "That is not a number! 🤪";
    } else if (number < 1 || number > 1000) {
        output.textContent = "Try a number between 1 and 1000";
    } else if (number < the_number) {
        output.textContent = "Too low! 👇";
        guess_input.select();
        timeout = setTimeout(await_guess, 3000);
    } else if (number > the_number) {
        output.textContent = "Too high! 👆";
        guess_input.select();
        timeout = setTimeout(await_guess, 3000);
    } else {
        output.textContent = `You got it in ${guess_count} guesses! 🥳`;
        show_confetti();
        timeout = setTimeout(new_game, 10000);
    }
}

guess_input.onkeydown = event => {
    if (event.code === "Enter") check_guess();
};

function show_confetti() {
    party.confetti(guess_input, {
        count: party.variation.range(1000, 20000),
        shapes: ["star", "roundedSquare"],
    });
}

new_game();
