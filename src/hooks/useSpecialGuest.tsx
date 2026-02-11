import { useMemo } from 'react';

type GuestType = 'bee' | 'cat' | null;

const getMonthDiff = (from: Date, to: Date) => {
  const years = to.getFullYear() - from.getFullYear();
  const months = to.getMonth() - from.getMonth();
  return years * 12 + months;
};

export const useSpecialGuest = (startDate: Date): GuestType => {
  return useMemo(() => {
    const today = new Date();

    const isValentine = today.getMonth() === 1 && today.getDate() === 14;
    if (isValentine) {
      return 'bee';
    }

    const monthDiff = getMonthDiff(startDate, today);
    const isMonthiversary = monthDiff >= 0 && today.getDate() === startDate.getDate();

    if (!isMonthiversary) return null;

    return monthDiff % 2 === 0 ? 'cat' : 'bee';
  }, [startDate]);
};
