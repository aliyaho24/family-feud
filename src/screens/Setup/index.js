import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Setup = (props) => {
  const navigate = useNavigate();

  const [teamAName, setTeamAName] = useState('');
  const [teamBName, setTeamBName] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'teamA') {
      setTeamAName(value);
    } else if (name === 'teamB') {
      setTeamBName(value);
    }
  };

  const handleBegin = () => {
    props.setTeamNames({ teamA: teamAName, teamB: teamBName });
    navigate('/game-board');
  };

  return (
    <div className="page-container">
      <div className="input-container">
        <div className="team-1">
          <h1> Team 1 Name: </h1>
          <input
            type="text"
            name="teamA"
            value={teamAName}
            onChange={handleInputChange}
            placeholder="Enter Team 1 Name"
          />
        </div>
        <div className="team-2">
          <h1> Team 2 Name: </h1>
          <input
            type="text"
            name="teamB"
            value={teamBName}
            onChange={handleInputChange}
            placeholder="Enter Team 2 Name"
          />
        </div>
      </div>
      <Button
        variant="contained"
        onClick={handleBegin}
      >
        Begin
      </Button>
    </div>
  );
}

export default Setup;
