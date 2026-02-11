// src/hooks/useGarden.ts
import { useState, useEffect } from 'react';

interface GardenState {
  completedFlowers: number; // Cantidad de flores terminadas (años pasados)
  currentProgress: number;  // 0 a 100 (progreso del año actual)
  currentYearLabel: string; // Ej: "Ciclo 2025-2026"
}

export const useGarden = (startDate: Date): GardenState => {
  const [state, setState] = useState<GardenState>({
    completedFlowers: 0,
    currentProgress: 0,
    currentYearLabel: '',
  });

  useEffect(() => {
    const calculateGarden = () => {
      const now = new Date();
      const start = new Date(startDate);
      const diffTime = now.getTime() - start.getTime();
      
      if (diffTime < 0) return;

      let yearsPassed = now.getFullYear() - start.getFullYear();
      
      const anniversaryThisYear = new Date(start);
      anniversaryThisYear.setFullYear(now.getFullYear());

      if (now < anniversaryThisYear) {
        yearsPassed--;
      }

      const currentCycleStart = new Date(start);
      currentCycleStart.setFullYear(now.getFullYear() + (now < anniversaryThisYear ? -1 : 0));
      
      const timeSinceCycleStart = now.getTime() - currentCycleStart.getTime();
      const daysInYear = 365; 
      const progress = Math.min((timeSinceCycleStart / (1000 * 60 * 60 * 24 * daysInYear)) * 100, 100);

      setState({
        completedFlowers: Math.max(0, yearsPassed),
        currentProgress: progress,
        currentYearLabel: `${currentCycleStart.getFullYear()} - ${currentCycleStart.getFullYear() + 1}`,
      });
    };

    calculateGarden();
  }, [startDate]);

  return state;
};