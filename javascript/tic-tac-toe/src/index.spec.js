import TicTacToe from './tic_tac_toe';

describe("TicTacToeSpec", () => {
    it("should declare a winner when first player has filled a row of boxes, should record previous game", () => {
        const sandbox = sinon.createSandbox();
        const loggerStub = { log: sandbox.stub() };
        expect(
            TicTacToe.newGame(loggerStub)
                .addMove("00")
                .addMove("01")
                .addMove("00")
                .addMove("02")
                .addMove("11")
                .addMove("21")
                .addMove("12")
                .addMove("")
                .addMove("20")
                .addMove("10")
        ).to.deep.equal(new TicTacToe({
            "board": {
                "00": " ",
                "10": " ",
                "20": " ",
                "01": " ",
                "11": " ",
                "21": " ",
                "02": " ",
                "12": " ",
                "22": " "
            },
            "currentPlayer": "X",
            "message": "Started new game!",
            "previousGames": [{
                "board": {
                    "00": "X",
                    "10": "O",
                    "20": "X",
                    "01": "O",
                    "11": "O",
                    "21": "X",
                    "02": "X",
                    "12": "O",
                    "22": " "
                },
                "winner": "O",
                "tie": false
            }]
        }, loggerStub));
    });

    it("should start a new game when game has finished", () => {
        const sandbox = sinon.createSandbox();
        const loggerStub = { log: sandbox.stub() };
        expect(
            TicTacToe.newGame(loggerStub)
                .addMove("00")
                .addMove("01")
                .addMove("00")
                .addMove("02")
                .addMove("11")
                .addMove("21")
                .addMove("12")
                .addMove("")
                .addMove("20")
                .addMove("10")
                .addMove("00")
        ).to.deep.equal(new TicTacToe({
            "board": {
                "00": "X",
                "10": " ",
                "20": " ",
                "01": " ",
                "11": " ",
                "21": " ",
                "02": " ",
                "12": " ",
                "22": " "
            },
            "currentPlayer": "O",
            "message": "Player 'X' took box '00'!",
            "previousGames": [{
                "board": {
                    "00": "X",
                    "10": "O",
                    "20": "X",
                    "01": "O",
                    "11": "O",
                    "21": "X",
                    "02": "X",
                    "12": "O",
                    "22": " "
                },
                "winner": "O",
                "tie": false
            }]
        }, loggerStub));
    });

    it("should allow a player to see the current board", () => {
        const sandbox = sinon.createSandbox();
        const loggerStub = { log: sandbox.stub() };
        expect(
            TicTacToe.newGame(loggerStub)
                .addMove("00")
                .addMove("10")
                .addMove("20")
                .displayBoard()
        ).to.deep.equal(new TicTacToe({
            "board": {
                "00": "X",
                "10": "O",
                "20": "X",
                "01": " ",
                "11": " ",
                "21": " ",
                "02": " ",
                "12": " ",
                "22": " "
            },
            "currentPlayer": "O",
            "message": "\n        |-----------------|\n        |-- X -- O -- X --|\n        |-----------------|\n        |--   --   --   --|\n        |-----------------|\n        |--   --   --   --|\n        |-----------------|\n        ",
            "previousGames": []
        }, loggerStub));
    });

    it("should allow a player to quit the game", () => {
        const sandbox = sinon.createSandbox();
        const loggerStub = { log: sandbox.stub() };
        expect(
            TicTacToe.newGame(loggerStub)
                .addMove("00")
                .addMove("10")
                .addMove("20")
                .quit()
        ).to.deep.equal(new TicTacToe({
            "board": {
                "00": " ",
                "10": " ",
                "20": " ",
                "01": " ",
                "11": " ",
                "21": " ",
                "02": " ",
                "12": " ",
                "22": " "
            },
            "currentPlayer": "X",
            "message": "Started new game!",
            "previousGames": [{
                "board": {
                    "00": "X",
                    "10": "O",
                    "20": "X",
                    "01": " ",
                    "11": " ",
                    "21": " ",
                    "02": " ",
                    "12": " ",
                    "22": " "
                },
                "winner": "X",
                "tie": true
            }]
        }, loggerStub));
    });

    it("should stop game if no available boxes and no winner", () => {
        const sandbox = sinon.createSandbox();
        const loggerStub = { log: sandbox.stub() };
        expect(
            TicTacToe.newGame(loggerStub)
                .addMove("00")
                .addMove("10")
                .addMove("20")
                .addMove("01")
                .addMove("11")
                .addMove("21")
                .addMove("02")
                .addMove("12")
                .addMove("22")
        ).to.deep.equal(new TicTacToe({
            "board": {
                "00": "X",
                "10": "O",
                "20": "X",
                "01": "O",
                "11": "X",
                "21": "O",
                "02": "X",
                "12": "O",
                "22": "X"
            },
            "currentPlayer": "X",
            "message": "No available boxes left, tie!",
            "previousGames": []
        }, loggerStub));
    });
});
