import { useMemo } from 'react';

export const useGarden = (startDate: Date) => {
  return useMemo(() => {
    const now = new Date();
    const start = new Date(startDate);

    if (now < start) return { completedFlowers: 0, currentProgress: 0, currentYearLabel: 'Aún no comienza' };
    let totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    
    const isBeforeAnniversaryDay = now.getDate() < start.getDate();
    if (isBeforeAnniversaryDay) totalMonths--;

    const completedFlowers = Math.max(0, totalMonths);
    const last15 = new Date(now.getFullYear(), now.getMonth() - (isBeforeAnniversaryDay ? 1 : 0), start.getDate());
    const next15 = new Date(now.getFullYear(), now.getMonth() + (isBeforeAnniversaryDay ? 0 : 1), start.getDate());
    
    const diffTotal = next15.getTime() - last15.getTime();
    const diffElapsed = now.getTime() - last15.getTime();
    const currentProgress = (diffElapsed / diffTotal) * 100;

    const label = now.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    return {
      completedFlowers,
      currentProgress,
      currentYearLabel: label.charAt(0).toUpperCase() + label.slice(1),
    };
  }, [startDate]);
};