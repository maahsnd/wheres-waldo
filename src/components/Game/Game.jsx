import React, { useState } from 'react';
import styles from './game.module.css?inLine';

function Game() {
  const [targetBox, setTargetBox] = useState(null);

  const target = (e) => {
    const image = e.currentTarget;
    const x = e.clientX;
    const y = e.clientY;

    // Create a new box around the click coordinates
    setTargetBox({
      left: x - 41,
      top: y - 51
    });
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.imageContainer} onClick={target}>
        <img src="/waldo.jpeg" alt="Game Image" className={styles.gameImage} />
        {targetBox && (
          <div
            className={styles.box}
            style={{ left: targetBox.left + 'px', top: targetBox.top + 'px' }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default Game;
