// src/components/TimeControlledLottie/TimeControlledLottie.tsx
import React, { useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
// Asegúrate de que esta ruta sea correcta a tu archivo JSON
import flowerAnimation from '../assets/flower.json'; 

interface Props {
  progress: number; // 0 a 100
}

const TimeControlledLottie: React.FC<Props> = ({ progress }) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  // Usamos un estado para forzar re-render cuando Lottie esté listo internamente
  const [, setLottieReady] = useState(false);

  useEffect(() => {
    const instance = lottieRef.current;
    if (!instance) return;

    // Obtenemos la duración total en frames. 
    // Si devuelve 0 es que no ha cargado, usamos 100 por defecto para evitar errores.
    const totalFrames = instance.getDuration(true) || 100;
    
    if (totalFrames > 0) {
      // Calculamos el frame exacto. Math.min asegura no pasarnos del 100%
      const targetFrame = (Math.min(progress, 100) / 100) * totalFrames;
      
      // "Congelamos" la animación en ese frame exacto.
      // El segundo parámetro 'true' indica que hablamos en frames, no en tiempo.
      instance.goToAndStop(targetFrame, true);
    }
  }, [progress]); // Se ejecuta cada vez que cambia el progreso

  return (
    // El contenedor controla el tamaño
    <div style={{ width: '100%', height: '100%' }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={flowerAnimation}
        loop={false}
        autoplay={false} // IMPORTANTE: No se reproduce sola
        // Cuando el DOM de Lottie carga, avisamos para que el useEffect pueda actuar
        onDOMLoaded={() => setLottieReady(true)} 
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default TimeControlledLottie;