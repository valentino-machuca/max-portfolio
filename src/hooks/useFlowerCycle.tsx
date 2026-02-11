
import { useState, useEffect } from 'react';

interface FlowerCycle {
  growthPercentage: number
  monthIndex: number;
  isCycleComplete: boolean;
}

export const useFlowerCycle = (startDate: Date): FlowerCycle => {
  const [cycleState, setCycleState] = useState<FlowerCycle>({
    growthPercentage: 0,
    monthIndex: 0,
    isCycleComplete: false,
  });

  useEffect(() => {
    const calculateGrowth = () => {
      const now = new Date();
      const start = new Date(startDate);

      start.setFullYear(now.getFullYear());
      
      if (now < start) {
         start.setFullYear(now.getFullYear() - 1);
      }

      const diffTime = Math.abs(now.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      const progress = Math.min((diffDays / 365) * 100, 100);
      const currentMonth = Math.floor((diffDays / 30.41));

      setCycleState({
        growthPercentage: progress,
        monthIndex: Math.min(currentMonth, 11),
        isCycleComplete: progress >= 100,
      });
    };

    calculateGrowth();

  }, [startDate]);

  return cycleState;
};