import React, { useEffect, useRef, useState, useMemo } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import flowerAnimation from '../assets/flower.json';

interface CompletedFlowerProps {
  delayMs?: number;
  progress?: number;
  animateOnLoad?: boolean;
}

const DAY_TO_FRAME = [
  0,  2,  4,  6,  8,  // Días 1-5 (Brote lento)
  12, 16, 20, 24, 28, // Días 6-10 (Crecimiento de tallo)
  33, 37, 40, 43, 45, // Días 11-15 (Aparición de capullo)
  47, 49, 51, 52, 53, // Días 16-20 (Apertura progresiva)
  54, 55, 56, 56, 57, // Días 21-25 (Detalles finales)
  57, 58, 58, 59, 59, 59 // Días 26-31 (Flor completa)
];

const getFrameForProgress = (progressPercent: number): number => {
  // Convertimos el porcentaje (0-100) a un índice de día (0-30)
  const dayIndex = Math.floor((progressPercent / 100) * (DAY_TO_FRAME.length - 1));
  return DAY_TO_FRAME[dayIndex];
};

const CurrentYearFlower: React.FC<CompletedFlowerProps> = ({
  progress = 0,
  animateOnLoad = true,
  delayMs = 0
}) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isReady, setIsReady] = useState(false);

  // El frame objetivo ahora es "fijo" según el día del mes
  const targetFrame = useMemo(() => getFrameForProgress(progress), [progress]);

  useEffect(() => {
    const instance = lottieRef.current;
    if (!instance || !isReady) return;

    // Evitamos el frame 60 que no existe (0-59)
    const safeFrame = Math.min(targetFrame, 59);

    const timeoutId = window.setTimeout(() => {
      if (animateOnLoad) {
        // Animamos desde el inicio del mes hasta el día de hoy
        instance.playSegments([0, safeFrame], true);
      } else {
        instance.goToAndStop(safeFrame, true);
      }
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [animateOnLoad, delayMs, isReady, targetFrame]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={flowerAnimation}
        loop={false}
        autoplay={false}
        onDOMLoaded={() => setIsReady(true)}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default CurrentYearFlower;