import React from 'react';
import styles from './game.module.css?inLine';

function Game() {
  const target = (e) => {
    console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.imageContainer} onClick={target}>
        <img src="/waldo.jpeg" alt="Game Image" className={styles.gameImage} />
      </div>
    </div>
  );
}

export default Game;
