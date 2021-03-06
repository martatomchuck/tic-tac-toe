// klasy CSS (ikony font-awesome) przyporządkowane do graczy
const PLAYER1 = "fa-circle";
const PLAYER2 = "fa-times";

let winner = null;
let round = 1;
const board = [
    ['','',''],
    ['','',''],
    ['','','']
];

// zwycięskie kombinacje
const combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const score = document.getElementById("score");

const boxes = [...document.querySelectorAll('.box')];
boxes.forEach(box => box.addEventListener('click', pick));

function pick(event) {
    // współrzędne elementów na tablicy board[row][column]
    // pobierane z atrybutu data i zapisywane do zmiennych row, column
    // event.target.dataset zwraca obiekt: DOMStringMap {row: '1', column: '2'}
    const { row, column } = event.target.dataset;

    // PLAYER1 porusza się w rundach nieparzystych
    // PLAYER2 porusza się w rundach parzystych
    const turn = round % 2 === 0 ? PLAYER2 : PLAYER1;

    // jeśli pole jest puste (falsy) funkcja wykonuje się dalej, wstawiamy odpowiednią wartość do pustego pola
    // jeśli pole nie jest puste (truthy) - zatrzymujemy działanie funkcji (blokujemy możliwość ponownego kliknięcia)
    if (board[row][column]) return;

    if (winner) {
        // po zakończonej grze: blokada pól na planszy
        board[row][column] = null;
    } else {
        event.target.classList.add(turn);
        board[row][column] = turn;
    }

    // sprawdzenie wyniku gry
    check();

    // jeśli nie ma zwycięzcy - przejście do kolejnej rundy
    if (!winner) {
        round++;
    }
}

function check() {
    // redukcja matrycy do jednej tablicy
    const result = board.reduce((total, row) => total.concat(row));

    // stworzenie odbrębnych tablic dla każdego gracza i odkładanie indexu klikniętego pola
    let moves = {
        'fa-circle': [],
        'fa-times': []
    };
    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null)
    // console.log(moves);

    // weryfikacja czy dla któregokolwiek gracza wystąpiła zwycięska kombinacja
    combinations.forEach(combination => {
        if (combination.every(index => moves[PLAYER1].indexOf(index) > -1)) {
            winner = "Winner: Player 1";
            displayScore(PLAYER1);
        }
        if (combination.every(index => moves[PLAYER2].indexOf(index) > -1)) {
            winner = "Winner: Player 2";
            displayScore(PLAYER2);
        }
    })

    console.log(winner);
    return winner;
}

function displayScore(winnerIcon) {
    score.textContent = "And the Winner is: ";

    const icon = document.createElement("span");
    icon.classList.add("fa", winnerIcon);
    score.appendChild(icon);
}