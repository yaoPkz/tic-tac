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
                    alert(`${winner} wins!`);
                    this.gameOver = true;

                    return {
                        success: true,
                        symbol: symbol
                    };
                }

                if (this.turnos === 9) {
                    console.log("tie");
                    this.gameOver = true;

                    return {
                        success: true,
                        symbol: symbol
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

/* html */


let board = Board();

let player1 = Player("mono", "x");
let player2 = Player("pato", "o");

let tic = Game(player1, player2, board);

const cells = document.querySelectorAll(".cell");

console.log(cells);

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {

        console.log(cell);

        const x = tic.turno(index);

        if (x.success === true) {
            cell.textContent = x.symbol;
        }


        console.log(board.lista);
    });
});





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