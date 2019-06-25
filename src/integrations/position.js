export default class Position {

    // default position is the starting position of chess
    constructor (score, gameState = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
        this.moveToGetHere = null;
        this.score = score;
        this.gameState = gameState;
        this.nextMoves = [];
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        this.score = score;
    }

    addNextMove(position) {
        this.nextMoves.push(position);
    }

    getNextMoves() {
        return this.nextMoves;
    }

    getGameState() {
        return this.gameState;
    }

    setMove(move) {
        this.moveToGetHere = move;
    }

    getMove() {
        return this.moveToGetHere;
    }

    removeNextMoves() {
        this.nextMoves = [];
    }
}