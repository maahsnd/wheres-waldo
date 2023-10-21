import React, { useState, useEffect } from 'react';
import styles from './win-display.module.css';
import { useParams } from 'react-router-dom';

const WinDisplay = (props) => {
  const [scores, setScores] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [winTime, setWinTime] = useState(0);
  const [disableForm, setDisableForm] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    //fetch scores
    setWinTime(Date.now());
    const getScores = async () => {
      const response = await fetch(
        `http://localhost:3000/games/${name}/scores`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) {
        throw new Error('Scores fetch failed');
      }
      const data = await response.json();
      setScores(data);

      return data;
    };
    getScores();
  }, []);

  const handleNameChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleRecordScore = async (e) => {
    e.preventDefault();
    setDisableForm(true);
    const response = await fetch(`http://localhost:3000/games/${name}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userInput,
        gameId: props.gameId,
        currentgameId: props.currentgameId,
        winTime: winTime
      })
    });
    if (!response.ok) {
      throw new Error('Scores submission failed');
    }
    const data = await response.json();
    setScores(data);
  };

  return (
    <div className={styles.highscoresContainer}>
      <h1 className={styles.congratulations}>Congratulations!</h1>
      <div className={styles.highScores}>
        <h2>High Scores</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr key={score._id}>
                <td>{score.name}</td>
                <td>{score.time} seconds</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!disableForm && (
        <div className={styles.recordScore}>
          <h2>Record Your Score</h2>
          <form onSubmit={handleRecordScore}>
            <input
              type="text"
              value={userInput}
              onChange={handleNameChange}
              placeholder="Enter your name"
              className={styles.input}
            />
            <button
              type="submit"
              className={styles.button}
              disabled={disableForm}
            >
              Record Score
            </button>
          </form>
        </div>
      )}

      <button>Play Again</button>
    </div>
  );
};

export default WinDisplay;
