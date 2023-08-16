import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const ScoreBoard = (props) => {
  const navigate = useNavigate();

  function backToGame() {
    if (props.round === 4) {
      console.log("End of game!");
    } else {
      props.setRound(props.round + 1);
      navigate('/game-board');
    }
  }

  return (
    <React.Fragment>
      <div className="container-scoreboard">
        <div className="header">
          <div className="round">
            <h1>Round {props.round}</h1>
          </div>
          <img className="logo" src="/logo.png" alt="logo" />
        </div>

        <div className="body">
          <div className="team">
            <h2>{props.teamNames.teamA.toUpperCase()}</h2>
            <h1>{props.teamScores.teamA}</h1>
          </div>

          <div className="team">
            <h2>{props.teamNames.teamB.toUpperCase()}</h2>
            <h1>{props.teamScores.teamB}</h1>
          </div>
        </div>

        <div className="footer">
          <button className="next" onClick={backToGame}>➡</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ScoreBoard;
