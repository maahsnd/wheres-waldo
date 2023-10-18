import React, { useState, useEffect, useRef } from 'react';
import styles from './game.module.css?inLine';
import WinDisplay from '../WinDisplay/WinDisplay';
import { useParams } from 'react-router-dom';
import uniqid from 'uniqid';

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
      setGame({
        img_link: data.img_link,
        characters: data.characters,
        gameId: data.gameId,
        currentgameId: data.currentgameId
      });
      setLoading(false);
    }
    fetchGame();
  }, []);

  const submitSelection = async (selection) => {
    const response = await fetch(`http://localhost:3000/games/${name}/coords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        character: selection,
        coords: markerCoords,
        gameId: game.gameId
      })
    });
    if (!response.ok) {
      throw new Error('Selection submission failed');
    }
    const data = await response.json();
    return data;
  };

  const handleOptionChange = async (e) => {
    setSelectedOption(e.target.value);
    //submit to backend
    const response = await submitSelection(e.target.value);
    //fill in proper if conditions in response to backend
    //successful guess
    if (response.found) {
      setFoundMarkers([...foundMarkers, markerCoords]);
    }
    //unsuccessful guess
    if (!response.found) {
      setError({ msg: `Sorry, that's not ${e.target.value}` });
      setTimeout(() => {
        setError(null);
        setActive(false);
      }, 1500);
    }
    //win
    if (response.found && response.win) {
      //reset found markers, otherwise they clutter win display
      setFoundMarkers();
      setWin(true);
    }
    //enable click unless not found, in which case timeout will handle
    if (response.found) {
      setActive(false);
    }

    setTargetBox(null);
    setDropdown(null);
    setSelectedOption('');
  };

  const target = (e) => {
    //disable function during character selection
    if (active) {
      return;
    }
    //disable after first click so opening select menu
    //does not register new coordinates
    setActive(true);
    // Calculate the coordinates relative to the image dimensions
    const image = document.querySelector(`.${styles.gameImage}`);
    const x = e.clientX - image.getBoundingClientRect().left;
    const y = e.clientY - image.getBoundingClientRect().top;

    setMarkerCoords({
      x: x,
      y: y
    });

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
              left: markerCoords.x - 90 + 'px',
              top: markerCoords.y - 10 + 'px'
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
                key={uniqid()}
                className={styles.foundMarker}
                style={{
                  left: marker.x - 30 + 'px',
                  top: marker.y - 30 + 'px'
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
              <select value={selectedOption} onChange={handleOptionChange}>
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
            <WinDisplay
              gameId={game.gameId}
              currentgameId={game.currentgameId}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
