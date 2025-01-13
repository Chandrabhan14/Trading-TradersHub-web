import { useState, useEffect } from 'react';

const useCounter = (targetValue,targetTime, initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < targetValue) {
        setCount((prevCount) => prevCount + 5);
      } else if (count > targetValue) {
        setCount((prevCount) => prevCount - 1);
      }
    }, targetTime);

    return () => clearInterval(interval);
  }, [count, targetValue]);

  const resetCounter = () => {
    setCount(initialValue);
  };

  return { count, resetCounter };
};

export default useCounter;
