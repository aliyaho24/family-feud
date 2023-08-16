import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import ScoreBoard from './screens/ScoreBoard';
import GameBoard from './screens/GameBoard';
import Setup from './screens/Setup';

function App() {
  const [teamNames, setTeamNames] = useState({ teamA: 'North Carolina', teamB: 'New Jersey' });
  const [teamScores, setTeamScores] = useState({ teamA: 0, teamB: 0 });
  const [round, setRound] = useState(1); // object with question array

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route
            path="score-board"
            element={<
              ScoreBoard
                teamNames={teamNames}
                teamScores={teamScores}
                round={round}
                setRound={setRound}
              />}
          />
          <Route
            path="/game-board"
            element={<
              GameBoard
                teamNames={teamNames}
                teamScores={teamScores}
                setTeamScores={setTeamScores}
                setRound={setRound}
                round={round}
              />}
          />
          <Route
            path="/setup"
            element={<Setup
              setTeamNames={setTeamNames}
              teamNames={teamNames}
            />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
