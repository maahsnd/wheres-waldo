import React from 'react';
import styles from './game.module.css?inLine';

function Game() {
  return (
    <div className={styles.gameContainer}>
      <div className={styles.imageContainer}>
        <img src="/waldo.jpeg" alt="Game Image" className={styles.gameImage} />
      </div>
    </div>
  );
}

export default Game;
