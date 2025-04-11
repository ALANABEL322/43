import { useState, useEffect } from 'react';

export const useFooterProximity = (threshold = 100) => {
  const [isFooterNear, setIsFooterNear] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distanceToFooter = footerRect.top - viewportHeight;

      setIsFooterNear(distanceToFooter < threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isFooterNear;
};