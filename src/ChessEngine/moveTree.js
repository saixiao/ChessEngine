import Chess from "chess.js";
import Position from "./position.js";
import EvalEngine from "./evaluation.js";

/**
 * TODO: implement a way to generate a alpha-beta pruned tree that can be reused and expanded upon a move to reduce # evaluations
 */
export default class MoveTree {

    constructor (gameState) {
        this.game = new Chess();
        this.movesToConsider = 5;
        this.EvalEngine = new EvalEngine();
        this.game.load(gameState);

        let score = this.EvalEngine.evalPosition(this.game.ascii(), 0);
        this.currPosition = new Position(score, gameState);
    }

    /**
     * Generates a tree from any given node
     * @param depth the depth of the current node in the tree
     * @param position the current position (position object) with the score and children
     * @param gameBoard the current state of the actual game
     */
    generateMoveTree(depth, position, gameState, maxPlayer) {
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
            this.game.load(gameState);
            this.game.move(move);
            let score = this.EvalEngine.evalPosition(this.game.ascii(), this.getMoveCount());
            let nextPosition = new Position(score, this.game.fen());
            nextPosition.setMove(move);
            position.addNextMove(nextPosition);
        });

        if (maxPlayer) {
            position.nextMoves.sort((a, b) => {
                return b.getScore() - a.getScore();
            });
        } else {
            position.nextMoves.sort((a, b) => {
                return a.getScore() - b.getScore();
            });
        }
        

        let counter = this.movesToConsider;
        position.nextMoves = position.nextMoves.filter(() => {
            if (counter > 0) {
                counter--;
                return true;
            }
        })

        console.log(position.nextMoves);

        // generate and score possible moves after this move
        if (newDepth > 0) {
            if (maxPlayer) {
                position.nextMoves.forEach((pos) => {
                    this.generateMoveTree(newDepth - 1, pos, pos.getGameState(), false);
                })
            } else {
                position.nextMoves.forEach((pos) => {
                    this.generateMoveTree(newDepth - 1, pos, pos.getGameState(), true);
                })
            }
            
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

    getMoveCount() {
        return this.game.fen().match(/\d+$/)[0];
    }

    removeNextMoves() {
        this.currPosition.removeNextMoves();
    }
}
