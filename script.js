function Player(name, simbolo) {
    return {
        name,
        simbolo
    };
}


function Game(player1, player2, board) {
    return {
        players: [player1, player2],
        board: board,
        currentPlayer: 0,
        turnos: 0,
        gameOver: false,

        turno: function (square) {

            // Don't allow moves after the game is over
            if (this.gameOver) {
                return;
            }

            // Convert input to a number
            square = Number(square);

            // Try to place the current player's mark
            if (board.placeMark(
                square,
                this.players[this.currentPlayer].simbolo
            )) {

                this.turnos += 1;

                // Check if someone won
                const winner = board.checkWinner();

                if (winner !== null) {
                    console.log(winner, "wins");
                    this.gameOver = true;
                    return;
                }

                // Check for tie
                if (this.turnos === 9) {
                    console.log("tie");
                    this.gameOver = true;
                    return;
                }

                // Change player
                if (this.currentPlayer === 0) {
                    this.currentPlayer = 1;
                } else {
                    this.currentPlayer = 0;
                }
            }
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


let board = Board();

let player1 = Player("mono", "x");
let player2 = Player("pato", "o");

let tic = Game(player1, player2, board);


const readline = require("readline-sync");

for (let i = 0; i < 20; i++) {

    const input = readline.question("Enter your move (0-8): ");

    tic.turno(input);

    console.log(board.lista);

    if (tic.gameOver) {
        break;
    }
}
