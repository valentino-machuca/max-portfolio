import React from 'react';
import { useGarden } from '../../hooks/useGarden';
import TimeControlledLottie from '../../components/TimeControllerLottie';
import CompletedFlower from '../../components/CompletedFlower';
import ValentineGuest from '../../components/ValentineGuest';
import styles from './home.module.scss';

const MIN_FLOWER_SLOTS = 24;

const Home: React.FC = () => {
  const startDate = new Date('2022-06-15T00:00:00');
  const { completedFlowers, currentProgress, currentYearLabel } = useGarden(startDate);

  const totalSlots = Math.max(MIN_FLOWER_SLOTS, completedFlowers + 1);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Jardín del tiempo</h1>
        <p>Ciclo actual: {currentYearLabel}</p>
        <small>Flores históricas ya crecidas: {completedFlowers}</small>
      </div>

      <ValentineGuest startDate={startDate} className={styles.specialGuest} />

      <div className={styles.gardenWrapper}>
        {Array.from({ length: totalSlots }).map((_, index) => {
          const isHistorical = index < completedFlowers;
          const isCurrentFlower = index === completedFlowers;

          return (
            <div
              key={`flower-slot-${index}`}
              className={isCurrentFlower ? styles.flowerItemLarge : styles.flowerItemSmall}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {isHistorical ? (
                <CompletedFlower />
              ) : (
                <TimeControlledLottie
                  progress={isCurrentFlower ? currentProgress : Math.max(5, currentProgress * 0.35)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
