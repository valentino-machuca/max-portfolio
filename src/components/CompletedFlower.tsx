// src/components/CompletedFlower/CompletedFlower.tsx
import React, { useRef } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import flowerAnimation from '../assets/flower.json';

const CompletedFlower: React.FC = () => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    const handleLoaded = () => {
        // Cuando carga, vamos directamente al último frame y paramos.
        if(lottieRef.current) {
            const lastFrame = lottieRef.current.getDuration(true) || 100;
            lottieRef.current.goToAndStop(lastFrame, true);
        }
    }

  return (
    // Un poco más transparentes para que destaquen menos que la actual
    <div style={{ width: '100%', height: '100%', opacity: 0.7, filter: 'grayscale(0.3)' }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={flowerAnimation}
        loop={false}
        autoplay={false}
        onDOMLoaded={handleLoaded}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default CompletedFlower;