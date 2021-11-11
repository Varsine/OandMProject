import React, { useEffect, useState } from 'react';

import Clock from './Clock';

import './App.css';

const MyClock = () => {
  const [ratios, setRatios] = useState({
    secondRatio: 0,
    minuteRatio: 0,
    hourRatio: 0,
  });

  const setClock = () => {
    const currentDate = new Date();
    const secondRatio = currentDate.getSeconds() / 60;
    const minuteRatio = (secondRatio + currentDate.getMinutes()) / 60;
    setRatios({
      secondRatio: currentDate.getSeconds() / 60,
      minuteRatio: (secondRatio + currentDate.getMinutes()) / 60,
      hourRatio: (minuteRatio + currentDate.getHours()) / 12,
    });
  };

  useEffect(() => {
    setInterval(() => {
      setClock();
    }, 1000);
  }, []);

  return (
    <Clock
      secondRatio={ratios.secondRatio}
      minuteRatio={ratios.minuteRatio}
      hourRatio={ratios.hourRatio}
    />
  );
};

export default MyClock;
