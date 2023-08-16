import './style.css';
import logo from './tcb-logo.png';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const [playing, setPlaying] = useState(0);
  const navigate = useNavigate();
  const audio = useRef(new Audio('/theme-song.mp3'));

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        if (playing === 0) {
            audio.current.loop = true;
            audio.current.play();
            setPlaying(1);
        } else if (playing === 1) {
            setPlaying(2);
            audio.current.pause();
        } else {
          navigate('/setup');
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to pause and remove the audio when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playing]);


  return (
    <div className="splash-screen-container">
      <img className="splash-image" src={logo} alt="logo" />
    </div>
  );
}

export default SplashScreen;
