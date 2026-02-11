import { useEffect, useState } from 'react';

interface GardenState {
  completedFlowers: number;
  currentProgress: number;
  currentYearLabel: string;
}

const MS_IN_DAY = 1000 * 60 * 60 * 24;

const getCycleStartForDate = (date: Date, startDate: Date) => {
  const cycleStart = new Date(startDate);
  cycleStart.setFullYear(date.getFullYear());

  if (date < cycleStart) {
    cycleStart.setFullYear(date.getFullYear() - 1);
  }

  return cycleStart;
};

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

      if (now < start) {
        setState({
          completedFlowers: 0,
          currentProgress: 0,
          currentYearLabel: `${start.getFullYear()} - ${start.getFullYear() + 1}`,
        });
        return;
      }

      const cycleStart = getCycleStartForDate(now, start);
      const nextCycleStart = new Date(cycleStart);
      nextCycleStart.setFullYear(cycleStart.getFullYear() + 1);

      const cycleDuration = nextCycleStart.getTime() - cycleStart.getTime();
      const elapsedTime = now.getTime() - cycleStart.getTime();
      const progress = Math.min((elapsedTime / cycleDuration) * 100, 100);

      const elapsedDays = Math.floor(elapsedTime / MS_IN_DAY);
      const monthlyProgress = Math.floor((elapsedDays / 30.44) * (100 / 12));

      const completedFlowers = Math.max(0, cycleStart.getFullYear() - start.getFullYear());

      setState({
        completedFlowers,
        currentProgress: Math.min(100, Math.max(progress, monthlyProgress)),
        currentYearLabel: `${cycleStart.getFullYear()} - ${cycleStart.getFullYear() + 1}`,
      });
    };

    calculateGarden();
  }, [startDate]);

  return state;
};
