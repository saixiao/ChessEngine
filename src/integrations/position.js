export default class Position {
    constructor (score, gameState) {
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
}