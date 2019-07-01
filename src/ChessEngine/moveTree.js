import Chess from "chess.js";
import Position from "./position.js";
import EvalEngine from "./evaluation.js";

/**
 * TODO: implement a way to generate a alpha-beta pruned tree that can be reused and expanded upon a move to reduce # evaluations
 */
export default class MoveTree {

    constructor (gameState) {
        let game = new Chess();
        this.EvalEngine = new EvalEngine();
        game.load(gameState);

        let score = this.EvalEngine.evalPosition(game.ascii(), 32);
        this.currPosition = new Position(score, gameState);
    }

    /**
     * Generates a tree from any given node
     * @param depth the depth of the current node in the tree
     * @param position the current position (position object) with the score and children
     * @param gameBoard the current state of the actual game
     */
    generateMoveTree(depth, position, gameState) {
        let game = new Chess();
        game.load(gameState);
        let possibleMoves = game.moves();

        // check to see if we hit max depth and if game is over at this point
        if (
            depth == 0,
            game.game_over() === true ||
            game.in_draw() === true ||
            possibleMoves.length === 0
        ) {
            return;
        }

        let newDepth = depth;

        // add children positions
        possibleMoves.forEach((move) => {
            game.load(gameState);
            game.move(move);
            let score = this.EvalEngine.evalPosition(game.ascii(), 32);
            let nextPosition = new Position(score, game.fen());
            nextPosition.setMove(move);
            position.addNextMove(nextPosition);
        });

        // generate and score possible moves after this move
        if (newDepth > 0) {
            position.nextMoves.forEach((pos) => {
                this.generateMoveTree(newDepth - 1, pos, pos.getGameState());
            })
        }

        return position;
    }

    // Razoring, build ontop of pre-existing tree
    // expandMoveTree(position) {
    //     if (position.getNextMoves().length > 0) {
    //         position.nextMoves.forEach((pos) => {
    //             this.expandMoveTree(pos);
    //         })
    //     }

    //     if (position.getNextMoves().length === 0) {
    //         this.generateMoveTree(0, position, position.getGameState());
    //         console.log(position);
    //     }

    //     return position;
    // }

    getCurrPosition() {
        return this.currPosition;
    }

    removeNextMoves() {
        this.currPosition.removeNextMoves();
    }
}
