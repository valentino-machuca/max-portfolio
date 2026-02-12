import React from 'react';
import Lottie from 'lottie-react';
import cat from '../../../assets/cat.json';
import styles from './Cat.module.scss';

const Cat: React.FC = () => {

  return (
    <div className={styles.catContainer}>
      <Lottie
        animationData={cat}
        loop={true}
        autoplay={true}
        className={styles.catVisual}
      />
    </div>
  );
};

export default Cat;