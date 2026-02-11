import React from 'react';
import Lottie from 'lottie-react';
import catAnimation from '../assets/cat.json';
import beeAnimation from '../assets/bees.json';
import { useSpecialGuest } from '../hooks/useSpecialGuest';

interface ValentineGuestProps {
  startDate: Date;
  className?: string;
}

const ValentineGuest: React.FC<ValentineGuestProps> = ({ startDate, className }) => {
  const guestType = useSpecialGuest(startDate);

  if (!guestType) return null;

  const animData = guestType === 'cat' ? catAnimation : beeAnimation;

  return (
    <div className={className}>
      <Lottie animationData={animData} loop autoplay />
    </div>
  );
};

export default ValentineGuest;
