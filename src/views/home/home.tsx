import React, { useEffect, useState } from 'react';
import { useGarden } from '../../hooks/useGarden';
import CurrentYearFlower from '../../components/CurrentYearFlower';
import styles from './home.module.scss';
import CompletedFlower from '../../components/CompletedFlower';

const MIN_FLOWER_SLOTS = 24; // Mínimo de flores para que se vea lleno

// Definimos la estructura de una posición
interface Position {
  top: number;
  left: number;
  scale: number;
  zIndex: number;
}

// ... imports
const Home: React.FC = () => {
  const startDate = new Date('2025-06-15');
  const { completedFlowers, currentProgress } = useGarden(startDate);
  const totalSlots = Math.max(MIN_FLOWER_SLOTS, completedFlowers + 1);
  
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const newPositions = Array.from({ length: totalSlots }).map(() => ({
      top: 15 + Math.random() * 70,
      left: 5 + Math.random() * 70,
      scale: 0.8 + Math.random() * 0.4,
      zIndex: 0,
    }));
    setPositions(newPositions);
  }, [totalSlots]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mi jardín para Emi</h1>
        <p>En este lugar va a existir una flor por cada mes que me regales a tu lado.</p>
        <small>{completedFlowers + 1} flores</small>
      </div>

      <div className={styles.scatteredGarden}>
        {positions.map((pos, index) => {
          const isHistorical = index < completedFlowers;
          const isCurrentFlower = index === completedFlowers;
          
          const flowerDate = new Date(startDate);
          flowerDate.setMonth(startDate.getMonth() + index);
          const label = flowerDate.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' }).toUpperCase();

          const style = {
            top: `${pos.top}%`,
            left: `${pos.left}%`,
            transform: `scale(${isCurrentFlower ? 1.2 : pos.scale})`,
            zIndex: isCurrentFlower ? 100 : Math.floor(pos.top),
          };

          return (
            <div key={`flower-${index}`}
                  className={`
                    ${styles.flowerWrapper} 
                    ${isCurrentFlower ? styles.currentWrapper : styles.historicalWrapper}
                    ${index == 0 ? styles.anniversaryFlower : ''}
                  `} style={style}>
              <div className={styles.flowerVisual}>
                {isHistorical && <>
                  <div className={styles.flowerLabel}>
                    {isCurrentFlower ? 'Creciendo 🌱' : label}
                  </div>
                  <CompletedFlower delayMs={index * 90} />
                </>}
                {isCurrentFlower && <>
                  <div className={styles.flowerLabel}>
                    {label}
                  </div>
                  <CurrentYearFlower progress={currentProgress} />
                </>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;