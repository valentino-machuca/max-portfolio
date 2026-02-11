
export const useSpecialGuest = () => {
  const today = new Date();
  
  const isValentine = today.getMonth() === 1 && today.getDate() === 14; 
  
  if (isValentine) return Math.random() > 0.5 ? 'bee' : 'cat';
  
  return null;
};