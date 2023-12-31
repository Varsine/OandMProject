import { useState, useEffect } from 'react';

import useEventListener from './useEventListener';

const useWindowSize = () => {
  const getSize = () => ({
    width: undefined,
    height: undefined,
  });

  const [windowSize, setWindowSize] = useState(getSize);

  const resizeHandler = () => {
    if (window && window.innerWidth && window.innerHeight) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  };

  useEventListener('resize', resizeHandler);

  useEffect(() => {
    resizeHandler();
  }, []);

  const isMobile = windowSize.width < 577;
  const isTablet = windowSize.width >= 577 && windowSize.width <= 768;
  const isTabletMid = windowSize.width <= 992;
  const isMaxTablet = windowSize.width > 768;
  const isLargeTablet = windowSize.width > 768 && windowSize.width <= 1024;
  const isDesktop = windowSize.width > 1024;
  const isLaptop = windowSize.width <= 1024;
  const isWide = windowSize.width > 1024 && windowSize.width < 1200;
  const windowWidth = windowSize.width;
  const windowHeight = windowSize.height;

  return {
    isWide,
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    windowWidth,
    isTabletMid,
    windowHeight,
    isLargeTablet,
    isMaxTablet,
  };
};

export default useWindowSize;
