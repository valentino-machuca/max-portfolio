import React from 'react';
import Lottie from 'lottie-react';
import cat from '../../../assets/cat.json';
import styles from './Cat.module.scss';

const Cat: React.FC = () => {
  const [rotation, setRotation] = React.useState(0);

  const handleAnimationComplete = () => {
    setRotation((prevRotation) => prevRotation + 180);
  };

  return (
    <div className={styles.catContainer}>
      <Lottie
        animationData={cat}
        loop={true}
        autoplay={true}
        className={styles.catVisual}
        onLoopComplete={handleAnimationComplete}
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  );
};

export default Cat;