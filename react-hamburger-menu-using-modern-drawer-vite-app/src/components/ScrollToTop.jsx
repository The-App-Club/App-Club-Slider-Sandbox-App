import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

// https://stackoverflow.com/a/68687869/15972569
const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
};
export {ScrollToTop};
