import {motion, useAnimationControls} from 'framer-motion';
import {useEffect} from 'react';

const Title = ({tik, title}) => {
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
    <motion.h2
      animate={controls}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
    >{`After ${title} hours`}</motion.h2>
  );
};

export {Title};
