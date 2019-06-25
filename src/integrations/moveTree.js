import Chess from "chess.js";
import Position from "./position.js";
import EvalEngine from "./evaluation.js";

/**
 * interface IPosition {
 *      score: number;
 *      nextMove: [Positions]
 * }
 */

export default class MoveTree {

    constructor (gameState) {
        this.game = new Chess();
        this.EvalEngine = new EvalEngine();
        this.game.load(gameState);

        let score = this.EvalEngine.evalPosition(this.game.ascii(), 32);
        this.currPosition = new Position(score, gameState);
    }

    /**
     * Generates a tree from any given node
     * @param depth the depth of the current node in the tree
     * @param position the current position (position object) with the score and children
     * @param gameBoard the current state of the actual game
     */
    generateMoveTree(depth, position, gameState) {
        this.game.load(gameState);
        let possibleMoves = this.game.moves();

        // check to see if we hit max depth and if game is over at this point
        if (
            depth == 0,
            this.game.game_over() === true ||
            this.game.in_draw() === true ||
            possibleMoves.length === 0
        ) {
            return;
        }

        let newDepth = depth;

        // add children positions
        possibleMoves.forEach((move) => {
            this.game.move(move);
            let score = this.EvalEngine.evalPosition(this.game.ascii(), 32);
            let nextPosition = new Position(score, this.game.fen());
            position.nextMoves.push(nextPosition);
        });

        // generate and score possible moves after this move
        if (newDepth > 0) {
            position.nextMoves.forEach((position) => {
                this.generateMoveTree(newDepth - 1, position, position.gameState);
            })
        }

        return position;
    }

    getCurrPosition() {
        return this.currPosition;
    }
}
