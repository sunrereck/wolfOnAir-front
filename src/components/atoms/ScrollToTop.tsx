import React, { useEffect } from 'react';

function ScrollToTop (): React.ReactElement | null {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default ScrollToTop;
