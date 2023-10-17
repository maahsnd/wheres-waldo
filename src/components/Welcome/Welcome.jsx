import React from 'react';
import styles from './welcome.module.css';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className={styles.welcomeContainer}>
      <h1 className={styles.welcomeText}>Welcome to the Photo Tagging Game!</h1>
      <p className={styles.welcomeText}>
        Click the button below to find Waldo and more characters in the picture.
      </p>
      <Link to="/game/waldo">
        <button className={styles.welcomeButton}>Find Waldo</button>
      </Link>
    </div>
  );
}

export default Welcome;
