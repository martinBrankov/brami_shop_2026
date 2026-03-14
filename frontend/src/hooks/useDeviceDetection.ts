import { useState, useEffect } from 'react';
import { isMobileDevice } from './useOrientation';

export function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mobile = isMobileDevice();
    setIsMobile(mobile);
    setIsReady(true);
  }, []);

  return { isMobile, isReady };
}
