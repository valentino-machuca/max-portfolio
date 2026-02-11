// src/pages/Home/Home.tsx
import React from 'react';
import { useGarden } from '../../hooks/useGarden'; // Asegúrate de tener el hook actualizado
import TimeControlledLottie from '../../components/TimeControllerLottie';
import CompletedFlower from '../../components/CompletedFlower';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  // Fecha de prueba antigua para ver el historial
  const startDate = new Date('2022-06-15T00:00:00'); 
  
  const { completedFlowers, currentProgress } = useGarden(startDate);

  return (
    <div className={styles.container}>
      <div className={styles.gardenWrapper}>
        {/* Flores Pasadas */}
        {Array.from({ length: completedFlowers }).map((_, index) => (
          <div key={index} className={styles.flowerItemSmall}>
            <CompletedFlower />
          </div>
        ))}

        {/* Flor Actual (Más grande) */}
        <div className={styles.flowerItemLarge}>
          <TimeControlledLottie progress={currentProgress} />
        </div>
      </div>
    </div>
  );
};

export default Home;