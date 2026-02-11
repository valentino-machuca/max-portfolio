import React from 'react';
import { useGarden } from '../../hooks/useGarden';
import TimeControlledLottie from '../../components/TimeControllerLottie';
import CompletedFlower from '../../components/CompletedFlower';
import ValentineGuest from '../../components/ValentineGuest';
import styles from './home.module.scss';

const FLOWERS_PER_ROW = 6;

const Home: React.FC = () => {
  const startDate = new Date('2022-06-15T00:00:00');
  const { completedFlowers, currentProgress, currentYearLabel } = useGarden(startDate);

  const totalRenderedFlowers = Math.max(FLOWERS_PER_ROW * 3, completedFlowers + 1);
  const completedToRender = Math.max(0, totalRenderedFlowers - 1);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Jardín del tiempo</h1>
        <p>Ciclo actual: {currentYearLabel}</p>
      </div>

      <ValentineGuest startDate={startDate} className={styles.specialGuest} />

      <div className={styles.gardenWrapper}>
        {Array.from({ length: completedToRender }).map((_, index) => (
          <div
            key={`completed-${index}`}
            className={styles.flowerItemSmall}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <CompletedFlower />
          </div>
        ))}

        <div
          className={styles.flowerItemLarge}
          style={{ animationDelay: `${completedToRender * 60}ms` }}
        >
          <TimeControlledLottie progress={currentProgress} />
        </div>
      </div>
    </div>
  );
};

export default Home;
