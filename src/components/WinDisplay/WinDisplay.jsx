import React, { useState, useEffect } from 'react';
import styles from './win-display.module.css';

const WinDisplay = () => {
  const [scores, setScores] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [winTime, setWinTime] = useState(0);

  useEffect(() => {
    // Simulated data for demonstration
    //fetch scores, time
    const sampleScores = [
      { name: 'Player 1', time: 45 },
      { name: 'Player 2', time: 52 },
      { name: 'Player 3', time: 60 }
    ];
    setScores(sampleScores);
    setWinTime(42); // Sample win time
  }, []);

  const handleNameChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleRecordScore = (e) => {
    e.preventDefault();
    setScores([...scores, { name: userInput, time: winTime }]);
    // Handle recording the user's score here
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
            {scores
              .sort((a, b) => a.time - b.time)
              .slice(0, 3)
              .map((score, index) => (
                <tr key={index}>
                  <td>{score.name}</td>
                  <td>{score.time} seconds</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

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
          <button type="submit" className={styles.button}>
            Record Score
          </button>
        </form>
      </div>
    </div>
  );
};

export default WinDisplay;
