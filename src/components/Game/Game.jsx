import React, { useState } from 'react';
import styles from './game.module.css?inLine';

function Game() {
  const [markerCoords, setMarkerCoords] = useState({});
  const [targetBox, setTargetBox] = useState(null);
  const [dropdown, setDropdown] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [active, setActive] = useState(false);
  const [foundMarkers, setFoundMarkers] = useState([]);
  const [error, setError] = useState(null);
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

    //success
    if (false) {
      setFoundMarkers([...foundMarkers, markerCoords]);
    }
    if (true) {
      setError({ msg: `Sorry, that's not ${e.target.value}` });
      setTimeout(() => {
        setError(null);
      }, 2000);
    }

    setActive(false);
    setTargetBox(null);
    setDropdown(null);
    setSelectedOption('');
  };

  const target = (e) => {
    //disable during character selection
    if (active) {
      return;
    }
    setMarkerCoords({
      left: e.clientX,
      top: e.clientY
    });

    // Create a new box around the click coordinates
    setTargetBox({
      left: e.clientX - 56,
      top: e.clientY - 51
    });
    setDropdown({
      left: e.clientX - 50,
      top: e.clientY - 45
    });
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.imageContainer} onClick={target}>
        <img src="/waldo.jpeg" alt="Game Image" className={styles.gameImage} />
        {error && (
          <div
            className={styles.error}
            style={{
              left: markerCoords.left - 95 + 'px',
              top: markerCoords.top - 10 + 'px'
            }}
          >
            {error.msg}{' '}
          </div>
        )}
        {/* markers for found characters, if any */}
        {foundMarkers && (
          <>
            {foundMarkers.map((marker) => (
              <div
                className={styles.foundMarker}
                style={{
                  left: marker.left + 40 + 'px',
                  top: marker.top + 'px'
                }}
              ></div>
            ))}
          </>
        )}
        {/* target box & dropdown menu */}
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
