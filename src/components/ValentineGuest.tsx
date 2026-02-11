// src/components/ValentineGuest/ValentineGuest.tsx
import React from 'react';
import Lottie from 'lottie-react';
import catAnimation from '../assets/cat.json';
import beeAnimation from '../assets/bees.json';
import { useSpecialGuest } from '../hooks/useSpecialGuest'; // El hook que definimos antes

const ValentineGuest: React.FC = () => {
  const guestType = useSpecialGuest(); // Retorna 'cat', 'bee' o null

  if (!guestType) return null;

  const animData = guestType === 'cat' ? catAnimation : beeAnimation;

  return (
    <div style={{ position: 'absolute', top: '20px', right: '20px', width: '150px' }}>
      <Lottie 
        animationData={animData} 
        loop={true} 
        autoplay={true} 
      />
    </div>
  );
};

export default ValentineGuest;