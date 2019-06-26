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
    this.game = new Chess();
    this.EvalEngine = new EvalEngine();
    this.currPosition = new Position(this.EvalEngine.evalPosition(this.game.ascii(), 32), this.game.fen());
  }

  alphaBeta = (position, depth, alpha, beta, maxPlayer) => {
    let game = new Chess();
    game.load(position.getGameState());
    let possibleMoves = game.moves();

    // check if we hit our leafs or game is over
    if (depth === 0 || game.game_over()) {
      return position;
    } 
    
    if (maxPlayer) {
      let bestWhitePosition = new Position(-Infinity);
      let nextMoves = [];
      possibleMoves.forEach((move) => {
          game.load(position.getGameState());
          game.move(move);
          let score = this.EvalEngine.evalPosition(game.ascii(), 32);
          let nextPosition = new Position(score, game.fen());
          nextPosition.setMove(move);
          nextMoves.push(nextPosition);
      });

      for (let i = 0; i < nextMoves.length; i++) {
        let nextMove = this.alphaBeta(nextMoves[i], depth - 1, alpha, beta, false);
        if (nextMove.getScore() >= bestWhitePosition.getScore()) {
          bestWhitePosition = nextMoves[i];
        }
        alpha = Math.max(alpha, nextMove.getScore());
        if (beta <= alpha) {
          break;
        }
      }
      return bestWhitePosition;

    } else {
      let bestBlackPosition = new Position(Infinity);
      let nextMoves = [];
      possibleMoves.forEach((move) => {
          game.load(position.getGameState());
          game.move(move);
          let score = this.EvalEngine.evalPosition(game.ascii(), 32);
          let nextPosition = new Position(score, game.fen());
          nextPosition.setMove(move);
          nextMoves.push(nextPosition);
      });

      for (let i = 0; i < nextMoves.length; i++) {
        let nextMove = this.alphaBeta(nextMoves[i], depth - 1, alpha, beta, false);
        if (nextMove.getScore() <= bestBlackPosition.getScore()) {
          bestBlackPosition = nextMoves[i];
        }
        beta = Math.min(beta, nextMove.getScore());
        if (beta <= alpha) {
          break;
        }
      }
      return bestBlackPosition;
    }
  }

  makeRandomMove = () => {
    let possibleMoves = this.game.moves();
    this.currPosition = new Position(this.EvalEngine.evalPosition(this.game.ascii(), 32), this.game.fen());
    console.log(this.game.ascii().replace(/ /g, "").slice(0, 150).replace(/[-+1-8|]/g, ""));

    // exit if the game is over
    if (
      this.game.game_over() === true ||
      this.game.in_draw() === true ||
      possibleMoves.length === 0
    ) {
      return;
    }

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
