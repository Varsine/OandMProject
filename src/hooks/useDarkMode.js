import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { THEMES } from 'constants/index';
import { modeSelector } from 'slices/mainSlice';

const useDarkMode = () => {
  const isDarkMode = useSelector(modeSelector);
  const activeTheme = isDarkMode ? THEMES.dark : THEMES.light;

  useEffect(() => {
    Object.keys(activeTheme).map((key) =>
      document.documentElement.style.setProperty(
        `--${key}`,
        `${activeTheme[key]}`,
      ),
    );
  }, [isDarkMode]);
};

export default useDarkMode;
