import React, { useState, useEffect } from 'react';
import styles from './win-display.module.css';
import { Link, useParams } from 'react-router-dom';

const WinDisplay = (props) => {
  const [scores, setScores] = useState([]);
  const [scoreId, setScoreId] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [disableForm, setDisableForm] = useState(null);

  useEffect(() => {
    //fetch scores
    const getScores = async () => {
      const [scoreGetRes, scorePostRes] = await Promise.all([
        fetch(`https://waldobackend-production.up.railway.app/games/waldo/scores`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }),
        fetch(`https://waldobackend-production.up.railway.app/games/waldo/scores`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            currentgameId: props.currentgameId,
            winTime: Date.now(),
            gameId: props.gameId
          })
        })
      ]);
      if (!scoreGetRes.ok) {
        throw new Error('Scores fetch failed');
      }
      if (!scorePostRes.ok) {
        throw new Error('User score post failed');
      }
      const [hiScoreData, userScoreData] = await Promise.all([
        scoreGetRes.json(),
        scorePostRes.json()
      ]);
      setScores(hiScoreData);
      setUserScore(userScoreData.time);
      setScoreId(userScoreData.scoreId);

      return;
    };
    getScores();
  }, []);

  const handleNameChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleRecordScore = async (e) => {
    e.preventDefault();
    setDisableForm(true);
    const response = await fetch(
      `https://waldobackend-production.up.railway.app/games/waldo/scores/username`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userInput,
          gameId: props.gameId,
          scoreId: scoreId,
          time: userScore
        })
      }
    );
    if (!response.ok) {
      throw new Error('Scores submission failed');
    }
    const data = await response.json();
    setScores(data);
  };

  return (
    <div className={styles.highscoresContainer}>
      <h1 className={styles.congratulations}>Congratulations!</h1>
      <h2>Your time {userScore}</h2>
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
      <Link to="/">
        <button>Play Again</button>
      </Link>
    </div>
  );
};

export default WinDisplay;
