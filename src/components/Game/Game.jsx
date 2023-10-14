import React, { useState } from 'react';
import styles from './game.module.css?inLine';

function Game() {
  const [targetBox, setTargetBox] = useState(null);
  const [dropdown, setDropdown] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [active, setActive] = useState(false);
  const [characters, setCharacters] = useState([
    'Waldo',
    'Woof',
    'Wenda',
    'Wizard Whitebeard',
    'Odlaw'
  ]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    //submit to backend
    setActive(false);
    setTargetBox(null);
    setDropdown(null);
    setSelectedOption('');
  };

  const target = (e) => {
    if (active) {
      return;
    }
    const image = e.currentTarget;
    const x = e.clientX;
    const y = e.clientY;

    // Create a new box around the click coordinates
    setTargetBox({
      left: x - 56,
      top: y - 51
    });
    setDropdown({
      left: x - 50,
      top: y - 45
    });
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.imageContainer} onClick={target}>
        <img src="/waldo.jpeg" alt="Game Image" className={styles.gameImage} />
        {targetBox && (
          <>
            {' '}
            <div
              className={styles.box}
              style={{ left: targetBox.left + 'px', top: targetBox.top + 'px' }}
            ></div>
            <div
              className={styles.dropdown}
              style={{ left: dropdown.left + 'px', top: dropdown.top + 'px' }}
            >
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                onClick={() => setActive(true)}
              >
                <option value="">Character</option>
                {characters.map((character, index) => (
                  <option key={index} value={character}>
                    {character}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Game;
