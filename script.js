function Player(name, simbolo) {
    return {
        name,
        simbolo
    };
}




function Board() {
    return {
        lista: [
            "", "", "",
            "", "", "",
            "", "", ""
        ],

        checkWinner: function () {
            if (
                this.lista[0] === this.lista[1] &&
                this.lista[1] === this.lista[2] &&
                this.lista[2] !== ""
            ) {
                return this.lista[0];

            } else if (
                this.lista[3] === this.lista[4] &&
                this.lista[4] === this.lista[5] &&
                this.lista[5] !== ""
            ) {
                return this.lista[3];

            } else if (
                this.lista[6] === this.lista[7] &&
                this.lista[7] === this.lista[8] &&
                this.lista[8] !== ""
            ) {
                return this.lista[6];

            } else if (
                this.lista[0] === this.lista[3] &&
                this.lista[3] === this.lista[6] &&
                this.lista[6] !== ""
            ) {
                return this.lista[0];

            } else if (
                this.lista[1] === this.lista[4] &&
                this.lista[4] === this.lista[7] &&
                this.lista[7] !== ""
            ) {
                return this.lista[1];

            } else if (
                this.lista[2] === this.lista[5] &&
                this.lista[5] === this.lista[8] &&
                this.lista[8] !== ""
            ) {
                return this.lista[2];

            } else if (
                this.lista[0] === this.lista[4] &&
                this.lista[4] === this.lista[8] &&
                this.lista[8] !== ""
            ) {
                return this.lista[0];

            } else if (
                this.lista[2] === this.lista[4] &&
                this.lista[4] === this.lista[6] &&
                this.lista[6] !== ""
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

            return false;
        },

        validateMove: function (position) {
            if (this.lista[position] === "x" || this.lista[position] === "o") {
                return false;
            }

            return true;
        }
    };
}





let board = Board();

const readline = require("readline-sync");

for (let i = 0; i < 10; i++) {
    const input = readline.question("Enter your move: ");
    board.turn(input);

    console.log(board.lista);

    if (board.checkWinner())
        break;
}
