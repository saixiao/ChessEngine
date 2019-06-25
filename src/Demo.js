import React, { Component } from 'react';
import LevelOne from "./integrations/myChessEngine";

class Demo extends Component {
  state = {
    LevelOne: true,
  };
  render() {
    return (
      <div>
        <div style={boardsContainer}>
          {this.state.LevelOne && <LevelOne />}
        </div>
      </div>
    );
  }
}

export default Demo;

const boardsContainer = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100vw',
  marginTop: 30,
  marginBottom: 50
};
