import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export const useResponsiveLayout = () => {
  const { width } = useWindowSize();
  const MOBILE_BREAKPOINT = 768;
  
  return {
    isMobile: width ? width <= MOBILE_BREAKPOINT : false,
    isLaptop: width ? width > MOBILE_BREAKPOINT : false,
    width,
    screenSize: width ? (width <= MOBILE_BREAKPOINT ? 'mobile' : 'laptop') : 'unknown'
  };
};