import useMobileDetect from 'use-mobile-detect-hook';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

const useLockIosToolbar = (isOpen) => {
  const detectMobile = useMobileDetect();

  const isIos = detectMobile.isIos();
  const isMobile = detectMobile.isMobile();

  useIsomorphicLayoutEffect(() => {
    if (isIos && isMobile && isOpen) {
      document.body.style.height = '100%';
      document.body.style.overflow = 'auto';
      document.body.style.position = 'relative';

      document.documentElement.style.height = '100%';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'relative';
    } else if (isIos && isMobile && !isOpen) {
      document.body.style.height = '100%';
      document.body.style.overflow = 'visible';
      document.body.style.position = 'unset';

      document.documentElement.style.height = 'unset';
      document.documentElement.style.overflow = 'unset';
      document.documentElement.style.position = 'unset';
    }
  }, [isOpen]);
};

export default useLockIosToolbar;
