import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import Chess from 'chess.js';
import EvalEngine from "./evaluation";

import Chessboard from '../Chessboard';


class HumanVsRandom extends Component {
  static propTypes = { children: PropTypes.func };

  state = { fen: 'start', squareStyles: {}, pieceSquare: '' };

  componentDidMount() {
    this.game = new Chess();
  }

  minMax = (position, depth, maxPlayer) => {
    this.game.load(position.board);
    if (depth === 0 || this.game.game_over()) {
      return EvalEngine.evalPosition(this.game.ascii(), 32);
    } else if (maxPlayer) {
      let maxEval = -Infinity;
      position.child.foreach((child) => {
        let nextMove = this.minMax(child, depth - 1, false);
        maxEval = Math.max(maxEval, nextMove);
      });
      return maxEval;
    } else {
      let minEval = Infinity;
      position.child.foreach((child) => {
        let nextMove = this.minMax(child, depth - 1, false);
        minEval = Math.min(minEval, nextMove);
      });
      return minEval;
    }
  }

  makeRandomMove = () => {
    let possibleMoves = this.game.moves();
    console.log(this.game.ascii().replace(/ /g, "").slice(0, 150).replace(/[-+1-8|]/g, ""));

    // exit if the game is over
    if (
      this.game.game_over() === true ||
      this.game.in_draw() === true ||
      possibleMoves.length === 0
    )
      return;

    let randomIndex = Math.floor(Math.random() * possibleMoves.length);
    this.game.move(possibleMoves[randomIndex]);
    this.setState({
      fen: this.game.fen(),
      squareStyles: {
        [this.game.history({ verbose: true })[this.game.history().length - 1]
          .to]: {
          backgroundColor: 'DarkTurquoise'
        }
      }
    });
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
      <HumanVsRandom>
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
      </HumanVsRandom>
    </div>
  );
}
