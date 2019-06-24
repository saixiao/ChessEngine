import React, { Component } from 'react';

import PlayRandomMoveEngine from './integrations/PlayRandomMoveEngine';
import LevelOne from "./integrations/LevelOne";

class Demo extends Component {
  state = {
    LevelOne: false,
    LevelTwo: false,
    LevelThree: false
  };
  render() {
    return (
      <div>
        <div style={buttonRow}>
          <button
            onClick={() =>
              this.setState({
                LevelOne: true,
                LevelTwo: false,
                LevelThree: false
              })
            }
            style={{ ...buttonStyle, ...{ backgroundColor: 'brown' } }}
          >
            Play a level One Engine
          </button>
          <button
            onClick={() =>
              this.setState({
                LevelOne: false,
                LevelTwo: true,
                LevelThree: false
              })
            }
            style={{ ...buttonStyle, ...{ backgroundColor: 'silver' } }}
          >
            Play a level Two Engine
          </button>
          <button
            onClick={() =>
              this.setState({
                LevelOne: false,
                LevelTwo: false,
                LevelThree: true
              })
            }
            style={{ ...buttonStyle, ...{ backgroundColor: 'gold' } }}
          >
            Play a level Three Engine
          </button>
        </div>
        <div style={boardsContainer}>
          {this.state.LevelOne && <LevelOne />}
          {this.state.LevelTwo && <PlayRandomMoveEngine />}
          {this.state.LevelThree && <PlayRandomMoveEngine />}
        </div>
      </div>
    );
  }
}

export default Demo;

const buttonStyle = { width: 200, height: 100, margin: 30, fontSize: 16 };

const buttonRow = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100vw',
  flexWrap: 'wrap'
};

const boardsContainer = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100vw',
  marginTop: 30,
  marginBottom: 50
};
