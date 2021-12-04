const PLAYER1 = "fa-circle";
const PLAYER2 = "fa-times";
let round = 1;

const boxes = [...document.querySelectorAll('.box')];
boxes.forEach(box => box.addEventListener('click', pick));

function pick(event) {
    const turn = round % 2 === 0 ? PLAYER2 : PLAYER1;
    event.target.classList.add(turn);
    round++;
}