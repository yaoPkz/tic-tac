/* objects  */

function Player(name, simbolo) {
    return {
        name,
        simbolo
    };
}


function Game(player1, player2, board) {
    return {
        board: board,
        currentPlayer: player1,
        turnos: 0,
        gameOver: false,

        turno: function (square) {

            if (this.gameOver) {
                return {
                    success: false
                };
            }

            square = Number(square);

            const symbol = this.currentPlayer.simbolo;

            if (board.placeMark(square, symbol)) {

                this.turnos += 1;

                const winner = board.checkWinner();

                if (winner !== null) {
                    console.log(winner, "wins");
                    this.gameOver = true;

                    return {
                        success: true,
                        symbol: symbol,
                        winner: true,
                        gameOver: true
                    };
                }

                if (this.turnos === 9) {
                    console.log("tie");
                    this.gameOver = true;

                    return {
                        success: true,
                        symbol: symbol,
                        winner: false,
                        gameOver: true
                    };
                }

                // Change player
                if (this.currentPlayer === player1) {
                    this.currentPlayer = player2;
                } else {
                    this.currentPlayer = player1;
                }

                return {
                    success: true,
                    symbol: symbol
                };
            }

            return {
                success: false
            };
        }
    };
}


function Board() {
    return {
        lista: [
            " ", " ", " ",
            " ", " ", " ",
            " ", " ", " "
        ],

        checkWinner: function () {

            // Row 1
            if (
                this.lista[0] === this.lista[1] &&
                this.lista[1] === this.lista[2] &&
                this.lista[2] !== " "
            ) {
                return this.lista[0];

                // Row 2
            } else if (
                this.lista[3] === this.lista[4] &&
                this.lista[4] === this.lista[5] &&
                this.lista[5] !== " "
            ) {
                return this.lista[3];

                // Row 3
            } else if (
                this.lista[6] === this.lista[7] &&
                this.lista[7] === this.lista[8] &&
                this.lista[8] !== " "
            ) {
                return this.lista[6];

                // Column 1
            } else if (
                this.lista[0] === this.lista[3] &&
                this.lista[3] === this.lista[6] &&
                this.lista[6] !== " "
            ) {
                return this.lista[0];

                // Column 2
            } else if (
                this.lista[1] === this.lista[4] &&
                this.lista[4] === this.lista[7] &&
                this.lista[7] !== " "
            ) {
                return this.lista[1];

                // Column 3
            } else if (
                this.lista[2] === this.lista[5] &&
                this.lista[5] === this.lista[8] &&
                this.lista[8] !== " "
            ) {
                return this.lista[2];

                // Diagonal 1
            } else if (
                this.lista[0] === this.lista[4] &&
                this.lista[4] === this.lista[8] &&
                this.lista[8] !== " "
            ) {
                return this.lista[0];

                // Diagonal 2
            } else if (
                this.lista[2] === this.lista[4] &&
                this.lista[4] === this.lista[6] &&
                this.lista[6] !== " "
            ) {
                return this.lista[2];
            }

            return null;
        },

        placeMark: function (square, symbol) {

            if (this.validateMove(square)) {
                this.lista[square] = symbol;
                return true;
            }

            console.log("That square is already taken.");
            return false;
        },

        validateMove: function (position) {

            // A square is available only if it contains " "
            return this.lista[position] === " ";
        }
    };
}

/* html  vars*/

const cells = document.querySelectorAll(".cell");
const playBoton = document.querySelector(".play");
const letrero = document.querySelector(".letrero");
let p1 = document.querySelector(".p1").value;
let p2 = document.querySelector(".p2").value;

if (p1 === "") {
    p1 = "Player 1";
}

if (p2 === "") {
    p2 = "Player 2";
}


let board;
let player1;
let player2;
let tic;

/* functions  */
function startGame() {
    board = Board();

    player1 = Player(`${p1}`, "😎");
    player2 = Player(`${p2}`, "🤮");

    tic = Game(player1, player2, board);
}

startGame();

function playAgain() {
    startGame();

    cells.forEach(cell => {
        cell.textContent = "";
    });
    letrero.textContent = "";
}


/*  html board even listeners */


cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        const result = tic.turno(index);

        if (result.success) {

            letrero.textContent = `${tic.currentPlayer.name}'s turn ${tic.currentPlayer.simbolo}`;
            cell.textContent = result.symbol;
        }
        if (result.gameOver && result.winner) {
            letrero.textContent = ` ${tic.currentPlayer.name}  wins`;
            console.log("1", result);
        } else if (result.gameOver) {
            letrero.textContent = ` tie`;
            console.log("2", result);
        }

    });
});




playBoton.addEventListener("click", playAgain);








/*
const readline = require("readline-sync");

for (let i = 0; i < 20; i++) {

    const input = readline.question("Enter your move (0-8): ");

    tic.turno(input);

    console.log(board.lista);

    if (tic.gameOver) {
        break;
    }
}
*/