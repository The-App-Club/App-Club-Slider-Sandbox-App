import {css} from '@emotion/css';
import {useEffect} from 'react';
import {motion, useAnimationControls} from 'framer-motion';

const WorkPage = ({tik}) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (tik) {
      controls.start({y: 0, opacity: 1});
    } else {
      controls.set({y: 100, opacity: 0});
    }
  }, [tik]);

  return (
    <section
      className={css`
        padding-top: 3rem;
        width: 100%;
        position: relative;
        min-height: 100vh;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
      `}
    >
      <motion.h2 animate={controls}>WorkPage</motion.h2>
      <p>something...</p>
      <p>something...</p>
      <p>something...</p>
    </section>
  );
};

export {WorkPage};
