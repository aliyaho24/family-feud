import './style.css';
import logo from './logo.png';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ReactRevealText from 'react-reveal-text';
import rounds from '../../components/answers';

const GameBoard = (props) => {
  const [points, setPoints] = useState(0);
  const [currentTeam, setCurrentTeam] = useState('');
  const [strikes, setStrikes] = useState(0);
  const [roundOver, setRoundOver] = useState(false);
  const [revealQuestion, setRevealQuestion] = useState(false);

  const navigate = useNavigate();
  const strikeAudio = useRef(new Audio('/strike.m4a'));
  const answerAudio = useRef(new Audio('family-feud-good-answer.mp3'));
  const winAudio = useRef(new Audio('round-win.mp3'));

  const initialAnswers = props.round <= 4 ? rounds[props.round - 1].answers : [];
  const question = props.round <= 4 ? rounds[props.round - 1].question : '';

  const [answers, setAnswers] = useState(initialAnswers);

  const strikeText = (
    <div>
      {Array.from({ length: strikes }, (_, index) => (
         <h1 key={index}>X</h1>
       ))}
    </div>
  );

  function handleReveal(answer) {
    const newList = answers.map((item) => {
      if (item.answer === answer && item.show === false) {
        const updatedItem = {
          ...item,
          show: true,
        };

        console.log("current points:", points, "revealed points:", item.points, points + item.points);
        setPoints(points + item.points);
        return updatedItem;
      }
      return item;
    });

    answerAudio.current.play();
    setAnswers(newList);
  }

  function handleStrike() {
    if (strikes < 3) {
      strikeAudio.current.play();
      setStrikes(strikes + 1);
    } else if (strikes >= 3) {
      setStrikes(0);
    }
  }

  const handleFinish = () => {
    var roundPoints;
    switch (props.round) {
      case 1 || 2:
        roundPoints = points;
        break;
      case 3:
        roundPoints = points * 2;
        break;
      case 4:
        roundPoints = points * 3;
        break;
      default:
        roundPoints = points;
    };

    if (!roundOver) {
      if (currentTeam === props.teamNames.teamA) {
        props.setTeamScores({
          teamA: props.teamScores.teamA + roundPoints,
          teamB: props.teamScores.teamB,
        });
        setRoundOver(true);
      } else if (currentTeam === props.teamNames.teamB) {
        props.setTeamScores({
          teamA: props.teamScores.teamA,
          teamB: props.teamScores.teamB + roundPoints
        });
        setRoundOver(true);
      }

      winAudio.current.play();
    }
    console.log("round points", roundPoints, "base points:", points);
  };

  const handleNext = () => {
    if (roundOver) {
      navigate('/score-board');
    }
  };

  return (
    <React.Fragment>
      <div className="strike">
        {strikeText}
      </div>

      <div className="container">
        <div className="header">
          <div className="round">
            <h1>Round {props.round}</h1>
            {props.round === 3 &&
              <h3 className="multiplier">points are DOUBLED!</h3>
            }
            {props.round === 4 &&
              <h2 className="multiplier">points are TRIPLED!</h2>
            }
          </div>
          <img className="logo" src={logo} alt="logo" />
          <button
            onClick={() => setRevealQuestion(!revealQuestion)}
            className="question"
          >
              <ReactRevealText
                show={revealQuestion}
                delayMin={100}
                delayMax={101}
              >
                {question}
              </ReactRevealText>
          </button>
        </div>

        <div className="team1">
          <Button
            variant="text"
            onClick={() => setCurrentTeam(props.teamNames.teamA)}
            className={currentTeam === props.teamNames.teamA ? "selected-team" : ""}
          >
            <div className="team-name">{props.teamNames.teamA}</div>
          </Button>
          <div className="team-score">{props.teamScores.teamA}</div>
        </div>

        <div className="answer-container">
          <div className="answer-board">
            {answers.map((answer, index) => (
              <div key={index} className="answer-item">
                <Button onClick={() => handleReveal(answer.answer)} variant="text">
                  <div className="answer">
                    <ReactRevealText
                      show={answer.show}
                      delayMin={400}
                      delayMax={450}
                    >
                      {answer.answer}
                    </ReactRevealText>
                  </div>
                  <div className="points">
                    <ReactRevealText
                      show={answer.show}
                      delayMin={400}
                      delayMax={450}
                    >
                      {answer.points.toString()}
                    </ReactRevealText>
                  </div>
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="team2">
          <Button
            variant="text"
            onClick={() => setCurrentTeam(props.teamNames.teamB)}
            className={currentTeam === props.teamNames.teamB ? "selected-team" : ""}
          >
            {props.teamNames.teamB}</Button>
          <div className="team-score">{props.teamScores.teamB}</div>
        </div>

        <div className="footer">
          <button onClick={handleStrike} className="x-button">X</button>
          <button onClick={handleFinish} className="finish-button">👑</button>
          <button className="next" onClick={handleNext}>➡</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GameBoard;
