import React, { useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import flowerAnimation from '../assets/flower.json';

interface Props {
  progress: number;
  delayMs?: number;
  animateFromStart?: boolean;
}

const TimeControlledLottie: React.FC<Props> = ({
  progress,
  delayMs = 0,
  animateFromStart = true,
}) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isReady, setIsReady] = useState(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const instance = lottieRef.current;
    if (!instance || !isReady) return;

    const totalFrames = instance.getDuration(true) || 100;
    const targetFrame = (Math.min(progress, 100) / 100) * totalFrames;

    const timeoutId = window.setTimeout(() => {
      if (!hasAnimatedRef.current && animateFromStart) {
        instance.playSegments([0, targetFrame], true);
        hasAnimatedRef.current = true;
        return;
      }

      instance.goToAndStop(targetFrame, true);
      hasAnimatedRef.current = true;
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [animateFromStart, delayMs, isReady, progress]);

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

export default TimeControlledLottie;
