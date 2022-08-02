import {motion, useAnimationControls} from 'framer-motion';
import {useEffect} from 'react';

const SemiTitle = ({tik, semiTitle}) => {
  // https://www.framer.com/docs/use-animation-controls/
  const controls = useAnimationControls();

  useEffect(() => {
    if (tik) {
      controls.start({x: 0, opacity: 1});
    } else {
      controls.set({x: -120, opacity: 0});
    }
  }, [tik]);

  return (
    <motion.h3
      animate={controls}
      transition={{
        duration: 0.4,
        delay: 0.2,
        ease: 'easeInOut',
      }}
    >
      {semiTitle}
    </motion.h3>
  );
};

export {SemiTitle};
