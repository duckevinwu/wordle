import { useState, useEffect } from 'react';

import Navbar from './navbar/Navbar';
import Board from './board/Board';
import Keyboard from './keyboard/Keyboard';
import Toast from './toast/Toast';
import StartModal from './modal/StartModal';
import WinModal from './modal/WinModal';
import LoseModal from './modal/LoseModal';

const Game = () => {
  const [guesses, setGuesses] = useState([]);
  const [currGuess, setCurrGuess] = useState('');
  const [finished, setFinished] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [answer, setAnswer] = useState('');
  const [time, setTime] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [startModalOpen, setStartModalOpen] = useState(true);
  const [clockActive, setClockActive] = useState(false);
  const [winModalOpen, setWinModalOpen] = useState(false);
  const [loseModalOpen, setLoseModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // load the answer word
  useEffect(() => {
    // call api to get word
    fetch('http://localhost:8080/api/v1/game')
      .then(response => response.json())
      .then(result => {
        console.log(result.answer);
        setAnswer(result.answer);
        setLoaded(true);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const handleChar = (c) => {
    if (guesses.length >= 6 || finished || revealing ||
      currGuess.length === 5 || !clockActive) return;
    setCurrGuess(currGuess + c);
  }

  const handleDelete = () => {
    if (guesses.length >= 6 || finished || revealing ||
      currGuess.length === 0 || !clockActive) return;
    setCurrGuess(currGuess.slice(0, -1));
  }

  const handleEnter = () => {
    if (guesses.length >= 6 || finished || revealing || !clockActive) return;
    if (currGuess.length !== 5) {
      // throw error message
      setToast({
        show: true,
        message: 'Not enough letters'
      });
      return;
    }

    setRevealing(true);
    const updatedGuesses = [...guesses, currGuess];
    setGuesses(updatedGuesses);
    setCurrGuess('');

    // check if won
    if (currGuess === answer) {
      setFinished(true);
      setRevealing(false);
      setClockActive(false);
      setWinModalOpen(true);
      return;
    }

    // check if lost
    if (updatedGuesses.length === 6) {
      setRevealing(false);
      setClockActive(false);
      setLoseModalOpen(true);
      return;
    }

    setRevealing(false);
  }

  // close toast
  const closeToast = () => {
    const updatedToastState = {
      ...toast,
      show: false
    }
    setToast(updatedToastState);
  }

  // begin game
  const startGame = () => {
    setStartModalOpen(false);
    setClockActive(true);
  }

  // set final time
  const setFinalTime = (t) => {
    setTime(t);
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <Navbar
            className="mb-2"
            finished={finished}
            active={clockActive}
            setFinalTime={setFinalTime}
          />
          <Board
            guesses={guesses}
            currGuess={currGuess}
            answer={answer}
          />
          <Keyboard
            handleChar={handleChar}
            handleDelete={handleDelete}
            handleEnter={handleEnter}
            guesses={guesses}
            answer={answer}
          />
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} closeToast={closeToast} />
      <StartModal show={startModalOpen} start={startGame} loaded={loaded} />
      <WinModal  show={winModalOpen} time={time} answer={answer} />
      <LoseModal show={loseModalOpen} time={time} answer={answer} />
    </>
  )
}

export default Game;
