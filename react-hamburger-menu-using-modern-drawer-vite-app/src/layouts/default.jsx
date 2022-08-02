import {css} from '@emotion/css';
import {motion} from 'framer-motion';
import {memo} from 'react';

const motionConfig = {
  initial: {
    x: 0,
    y: 60,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  hide: {
    x: 0,
    y: 60,
    opacity: 0,
  },
};

const Layout = ({children, pathname, notifer}) => {
  return (
    <motion.div
      variants={motionConfig}
      initial={'initial'}
      animate={'animate'}
      exit={'hide'}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      className={css`
        width: 100%;
        position: relative;
      `}
      onAnimationStart={(e) => {}}
      onAnimationComplete={(e) => {
        const html = document.documentElement;
        const body = html.querySelector('body');
        html.classList.remove('loading');
        body.classList.remove('loading');
        notifer({pathname});
      }}
    >
      {children}
    </motion.div>
  );
};

export default memo(Layout);
