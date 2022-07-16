export default class TicTacToe {
    constructor(state, logger) {
        this.state = state;
        this.logger = logger;
    };

    static newGame(logger, previousGames) {
        return new TicTacToe({
            board: {
                "00": " ", "10": " ", "20": " ",
                "01": " ", "11": " ", "21": " ",
                "02": " ", "12": " ", "22": " "
            },
            currentPlayer: "X",
            message: "Started new game!",
            previousGames: previousGames !== undefined ? previousGames : []
        }, logger);
    }

    addMove(box) {
        const board = this.state.board;
        const currentPlayer = this.state.currentPlayer;
        const isBoxInBoard = board.hasOwnProperty(box);
        const isBoxAvailable = board[box] === " ";

        if (!isBoxInBoard || !isBoxAvailable) {
            const message = !isBoxAvailable ? `Box '${box}' does not exist.` : `Box '${box}' already taken!`;
            return this._updateState({
                currentPlayer: currentPlayer === "X" ? "X" : "O",
                message: `${message} Try again Player ${currentPlayer}!`
            });
        } else {
            board[box] = currentPlayer;

            const availableBoxes = this._getAvailableBoxes(board);
            if (this._checkForWinner(board, currentPlayer)) {
                const updatedGames = this.state.previousGames.concat([{
                    board: this.state.board,
                    winner: currentPlayer,
                    tie: false
                }]);
                return TicTacToe.newGame(this.logger, updatedGames);
            } else if (availableBoxes.length <= 0) {
                return this._updateState({
                    board: board,
                    currentPlayer: currentPlayer,
                    message: "No available boxes left, tie!"
                });
            } else {
                return this._updateState({
                    board: board,
                    currentPlayer: currentPlayer === "X" ? "O" : "X",
                    message: `Player '${currentPlayer}' took box '${box}'!`
                });
            }
        }
    }

    displayBoard() {
        return this._updateState({
            message: this._getCurrentBoard(this.state.board)
        });
    }

    getAvailableBoxes() {
        return this._updateState({
            message: `\nAvailable Boxes: [${this._getAvailableBoxes(this.state)}].\n`
        });
    }

    quit() {
        const currentPlayer = this.state.currentPlayer;
        const nextPlayer = currentPlayer === "X" ? "O" : "X";

        const updatedGames = this.state.previousGames.concat([{
            board: this.state.board,
            winner: nextPlayer,
            tie: true
        }]);

        return TicTacToe.newGame(this.logger, updatedGames);
    }

    _updateState(newState) {
        let updatedState = Object.assign({}, this.state, newState);
        if (!newState["board"]) {
            updatedState = Object.assign({}, updatedState, {
                board: this.state.board
            });
        }
        return new TicTacToe(updatedState, this.logger);
    }

    _getAvailableBoxes(board) {
        let availableBoxes = [];
        for (let property in board) {
            if (board.hasOwnProperty(property) && board[property] === ' ') {
                availableBoxes.push(property);
            }
        }

        return availableBoxes;
    }

    _getCurrentBoard(board) {
        const printedBoard = `
        |-----------------|
        |-- ${board["00"]} -- ${board["10"]} -- ${board["20"]} --|
        |-----------------|
        |-- ${board["01"]} -- ${board["11"]} -- ${board["21"]} --|
        |-----------------|
        |-- ${board["02"]} -- ${board["12"]} -- ${board["22"]} --|
        |-----------------|
        `;

        return printedBoard;
    }

    _checkForWinner(board, currentPlayer) {
        return (board["00"] === currentPlayer && board["10"] === currentPlayer && board["20"] === currentPlayer) ||
               (board["01"] === currentPlayer && board["11"] === currentPlayer && board["21"] === currentPlayer) ||
               (board["02"] === currentPlayer && board["12"] === currentPlayer && board["22"] === currentPlayer) ||
               (board["00"] === currentPlayer && board["01"] === currentPlayer && board["02"] === currentPlayer) ||
               (board["10"] === currentPlayer && board["11"] === currentPlayer && board["12"] === currentPlayer) ||
               (board["20"] === currentPlayer && board["21"] === currentPlayer && board["22"] === currentPlayer);
    }
}
