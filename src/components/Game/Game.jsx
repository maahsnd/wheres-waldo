import React, { useState, useEffect, useRef } from 'react';
import styles from './game.module.css?inLine';
import WinDisplay from '../WinDisplay/WinDisplay';
import { useParams } from 'react-router-dom';

function Game() {
  const [markerCoords, setMarkerCoords] = useState({});
  const [win, setWin] = useState(false);
  const [targetBox, setTargetBox] = useState(null);
  const [dropdown, setDropdown] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [active, setActive] = useState(false);
  const [foundMarkers, setFoundMarkers] = useState([]);
  const [error, setError] = useState(null);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const { name } = useParams();

  useEffect(() => {
    async function fetchGame() {
      const response = await fetch('http://localhost:3000/games/' + name);
      if (!response.ok) {
        console.error('error fetching game');
      }
      const data = await response.json();
      setGame({ img_link: data.img_link, characters: data.characters });
      setLoading(false);
    }
    fetchGame();
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    //submit to backend

    //fill in proper if conditions in response to backend
    //success
    if (false) {
      setFoundMarkers([...foundMarkers, markerCoords]);
    }
    //failure
    if (false) {
      setError({ msg: `Sorry, that's not ${e.target.value}` });
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
    //win
    if (false) {
      setActive(true);
      setWin(true);
    }

    /* setActive(false); */
    setTargetBox(null);
    setDropdown(null);
    setSelectedOption('');
  };

  const target = (e) => {
    // Calculate the coordinates relative to the image dimensions
    const image = document.querySelector(`.${styles.gameImage}`);
    const x = e.clientX - image.getBoundingClientRect().left;
    const y = e.clientY - image.getBoundingClientRect().top;
    //disable during character selection
    if (active) {
      return;
    }
    setMarkerCoords({
      x: x,
      y: y
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

  if (loading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className={styles.gameContainer}>
      <div className={styles.imageContainer} onClick={target}>
        <img
          src={game.img_link}
          alt="Game Image"
          className={styles.gameImage}
        />
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
                  left: marker.x + 40 + 'px',
                  top: marker.y + 'px'
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
                {game.characters.map((character, index) => (
                  <option key={index} value={character}>
                    {character}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        {win && (
          <div className={styles.winDisplay}>
            <WinDisplay />
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
