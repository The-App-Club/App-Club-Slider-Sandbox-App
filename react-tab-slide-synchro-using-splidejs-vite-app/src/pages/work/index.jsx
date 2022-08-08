import {css} from '@emotion/css';
import {useEffect} from 'react';
import {motion, useAnimationControls} from 'framer-motion';

const WorkPage = ({tik}) => {
  return (
    <section
      className={css`
        width: 100%;
        position: relative;
        min-height: 30rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
      `}
    >
      <motion.h2>WorkPage</motion.h2>
      <p>something...</p>
      <p>something...</p>
      <p>something...</p>
    </section>
  );
};

export {WorkPage};
