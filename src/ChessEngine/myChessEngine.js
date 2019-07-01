import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import Chess from 'chess.js';
import EvalEngine from "./evaluation.js";
import Position from "./position.js";

import Chessboard from '../Chessboard';


class MyChessEngine extends Component {
  static propTypes = { children: PropTypes.func };

  state = { fen: 'start', squareStyles: {}, pieceSquare: '' };

  componentDidMount() {
    this.depth = 3;
    this.goodMoveRange = 400;
    this.game = new Chess();
    this.EvalEngine = new EvalEngine();
    this.currPosition = new Position(this.EvalEngine.evalPosition(this.game.ascii(), this.getMoveCount()), this.game.fen());
  }

  /**
   * This is a modified alpha-beta algorithm. It chooses a handful of nodes to use the search algorithm on.
   * In turn based games, almost always the opponent can improve their position given any board.
   * Thus we don't want to consider any moves we make that would put us into a worse position.
   * Also we have a score so that we don't consider anymoves that are far worse than our current move.
   */
  alphaBeta = (position, depth, alpha, beta, maxPlayer) => {
    let game = new Chess();
    game.load(position.getGameState());
    if (depth === 0 || game.game_over()) {
      return position;
    }

    const currentScore = this.EvalEngine.evalPosition(game.ascii(), this.getMoveCount());

    let moves = game.moves()
    let possibleMoves = moves.map((move) => {
      game.load(position.getGameState());
      game.move(move);
      let pos = new Position(this.EvalEngine.evalPosition(game.ascii(), this.getMoveCount()), game.fen());
      pos.setMove(move);
      return pos;
    });
    game.load(position.getGameState());

    // white to move
    if (maxPlayer) {
      console.log("WHITE");
      // sort by moves that will give us best result and filter out moves that don't seem as good or put us into an even worse position
      // this prevents the chess engine from making risker plays like sacrificing pieces, but will make the better move generally
      possibleMoves.sort((a, b) => {
        return b.getScore() - a.getScore();
      });

      // the currentboard might not be a good position at all
      const goodScore = Math.max(possibleMoves[0].getScore() - this.goodMoveRange, currentScore);

      possibleMoves = possibleMoves.filter((move) => {
        return move.getScore() > goodScore;
      })

      console.log(goodScore, possibleMoves);

      let bestWhitePosition = new Position(-Infinity);
      for (let i = 0; i < possibleMoves.length; i++) {
        game.load(position.getGameState());
        game.move(possibleMoves[i]);
        let nextMove = this.alphaBeta(possibleMoves[i], depth - 1, alpha, beta, false);
        if (nextMove.getScore() > bestWhitePosition.getScore()) {
          bestWhitePosition = possibleMoves[i];
        }
        if (alpha < nextMove.getScore()) {
          alpha = nextMove.getScore();
        }
        if (beta <= alpha) {
          break;
        }
      }
      return bestWhitePosition;

    } 
    // black to move
    else {
      console.log("BLACK")
      // sort by moves that will give us best result (lowests score in this case is best)
      possibleMoves.sort((a, b) => {
        return a.getScore() - b.getScore();
      });
      const goodScore = Math.min(possibleMoves[0].getScore() + this.goodMoveRange, currentScore);

      possibleMoves = possibleMoves.filter((move) => {
        return move.getScore() < goodScore;
      });

      console.log(goodScore, possibleMoves);

      let bestBlackPosition = new Position(Infinity);
      for (let i = 0; i < possibleMoves.length; i++) {
        game.load(position.getGameState());
        game.move(possibleMoves[i]);
        let nextMove = this.alphaBeta(possibleMoves[i], depth - 1, alpha, beta, true);
        if (nextMove.getScore() < bestBlackPosition.getScore()) {
          bestBlackPosition = possibleMoves[i];
        }
        if (beta > nextMove.getScore()) {
          beta = nextMove.getScore();
        }
        if (beta <= alpha) {
          break;
        }
      }
      return bestBlackPosition;

    }
  }

  makeRandomMove = () => {
    let possibleMoves = this.game.moves();
    this.currPosition = new Position(this.EvalEngine.evalPosition(this.game.ascii(), this.getMoveCount()), this.game.fen());
    console.log(this.game.ascii().replace(/ /g, "").slice(0, 150).replace(/[-+1-8|]/g, ""));

    // exit if the game is over
    if (
      this.game.game_over() === true ||
      this.game.in_draw() === true ||
      possibleMoves.length === 0
    ) {
      return;
    }

    console.log(this.getMoveCount());

    let start = new Date().getTime();
    let bestBlackMove = this.alphaBeta(this.currPosition, this.depth, -Infinity, Infinity, false);
    let end = new Date().getTime();

    console.log("ALPHABETA ALGO TIME: ", end - start);
    console.log("BLACKMOVE: ", bestBlackMove);

    // make move
    this.game.move(bestBlackMove.getMove());
    this.currPosition = bestBlackMove;
    this.setState({
      fen: this.game.fen(),
      squareStyles: {
          [this.game.history({ verbose: true })[this.game.history().length - 1]
            .to]: {
            backgroundColor: 'DarkTurquoise'
          }
        }
    });

    console.log("---------------- YOUR TURN ----------------");
  };

  getMoveCount() {
    return this.game.fen().match(/\d+$/)[0];
  }

  onDrop = ({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    var move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    this.setState({ fen: this.game.fen() });

    window.setTimeout(this.makeRandomMove, 1000);
  };

  onSquareClick = square => {
    this.setState({
      squareStyles: { [square]: { backgroundColor: 'DarkTurquoise' } },
      pieceSquare: square
    });

    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: 'q' // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    this.setState({ fen: this.game.fen() });
    window.setTimeout(this.makeRandomMove, 1000);
  };

  render() {
    const { fen, squareStyles } = this.state;
    return this.props.children({
      position: fen,
      onDrop: this.onDrop,
      onSquareClick: this.onSquareClick,
      squareStyles
    });
  }
}

export default function LevelOne() {
  return (
    <div>
      <MyChessEngine>
        {({ position, onDrop, onSquareClick, squareStyles }) => (
          <Chessboard
            calcWidth={({ screenWidth }) => (screenWidth < 500 ? 350 : 480)}
            id="humanVsRandom"
            position={position}
            onDrop={onDrop}
            boardStyle={{
              borderRadius: '5px',
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
            onSquareClick={onSquareClick}
            squareStyles={squareStyles}
          />
        )}
      </MyChessEngine>
    </div>
  );
}
