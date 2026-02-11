import React, { useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import flowerAnimation from '../assets/flower.json';

interface CompletedFlowerProps {
  delayMs?: number;
  animateOnLoad?: boolean;
}

const CompletedFlower: React.FC<CompletedFlowerProps> = ({
  delayMs = 0,
  animateOnLoad = true,
}) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const instance = lottieRef.current;
    if (!instance || !isReady) return;

    const lastFrame = instance.getDuration(true) || 100;

    const timeoutId = window.setTimeout(() => {
      if (animateOnLoad) {
        instance.playSegments([0, lastFrame], true);
        return;
      }

      instance.goToAndStop(lastFrame, true);
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [animateOnLoad, delayMs, isReady]);

  const handleComplete = () => {
    const instance = lottieRef.current;
    if (!instance) return;

    const lastFrame = instance.getDuration(true) || 100;
    instance.goToAndStop(lastFrame, true);
  };

  return (
    <div style={{ width: '100%', height: '100%', opacity: 0.78, filter: 'grayscale(0.25)' }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={flowerAnimation}
        loop={false}
        autoplay={false}
        onDOMLoaded={() => setIsReady(true)}
        onComplete={handleComplete}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default CompletedFlower;
