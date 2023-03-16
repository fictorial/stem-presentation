let moves;
let letter;
let squares = Array.from(document.querySelectorAll('.square'));

const intergame_delay = 1000;

function new_game() {
    squares.forEach(square => {
        square.classList.remove('win');
        square.textContent = null;
    });

    moves = 0;
    letter = 'X';
}

function show_move(square) {
    if (square.textContent)
        return false;

    square.textContent = letter;
    ++moves;

    return true;
}

function start_next_turn() {
    letter = letter === 'X' ? 'O' : 'X';
}

function check_game_over() {
    const rows = [[0,1,2], [3,4,5], [6,7,8]];
    const columns = [[0,3,6], [1,4,7], [2,5,8]];
    const diagonals = [[0,4,8], [2,4,6]];

    for (let index_set of [rows, columns, diagonals]) {
        for (let indices of index_set) {
            if (all_have_same_letter(indices)) {
                return {
                    game_over: true,
                    winner: letter_at(indices[0]),
                    indices
                };
            }
        }
    }

    if (moves === 9) {
        return {
            game_over: true,
            winner: null,
            indices: null
        };
    }

    return {
        game_over: false,
        winner: null,
        indices: null
    };
}

function all_have_same_letter(indices) {
    let first = letter_at(indices[0]);

    if (!first) {
        return false;
    }

    for (let other of indices.slice(1)) {
        if (letter_at(other) !== first) {
            return false;
        }
    }

    return true;
}

function letter_at(square_index) {
    return squares[square_index].textContent;
}

document.addEventListener('click', event => {
    const thing_clicked = event.target;

    if (thing_clicked.classList.contains('square')) {
        const square_clicked = thing_clicked;

        if (show_move(square_clicked)) {
            const result = check_game_over();

            if (result.game_over) {
                if (result.winner) {
                    for (let index of result.indices) {
                        squares[index].classList.add('win');
                    }
                }

                setTimeout(new_game, intergame_delay);
            } else {
                start_next_turn();
            }
        }
    }
})

new_game();
