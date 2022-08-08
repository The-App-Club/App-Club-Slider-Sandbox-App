import {motion, useAnimationControls} from 'framer-motion';
import {css, cx} from '@emotion/css';
import {useEffect} from 'react';
import {useState} from 'react';

const Tab = ({
  tabsDomRef,
  activeSlideIndex,
  data,
  splideInstanceMoveRef,
  splideInstanceControllerRef,
}) => {
  const bgControls = useAnimationControls();
  const [left, setLeft] = useState(0);

  useEffect(() => {
    bgControls.start({
      opacity: 1,
      x: left,
    });
  }, [left]);

  useEffect(() => {
    const dom = tabsDomRef[activeSlideIndex].current;
    setLeft(dom.offsetLeft);
  }, [activeSlideIndex]);

  return (
    <ul
      className={css`
        position: relative;
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          transition: color 250ms ease;
          padding: 5px;
          cursor: pointer;
          min-width: 5.5rem;
          min-height: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          &.active {
            color: rgb(255, 255, 255);
            /* background: #f6f6f6; */
          }
        }
      `}
    >
      {data.map((item, index) => {
        return (
          <li
            ref={tabsDomRef[index]}
            key={index}
            className={cx(
              css``,
              `${index === activeSlideIndex ? 'active' : ''}`
            )}
            onClick={(e) => {
              const nextIndex = Math.min(data.length - 1, index + 1);
              const activeIndex = index;
              const prevIndex = Math.max(0, index - 1);
              splideInstanceControllerRef.current.setIndex(activeIndex);
              splideInstanceMoveRef.current.move(
                nextIndex,
                activeIndex,
                prevIndex
              );
            }}
          >
            {item.name}
          </li>
        );
      })}
      <motion.li
        animate={bgControls}
        className={css`
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: -1;
          /* background: #f6f6f6; */
          background-color: rgb(79, 101, 241);
          background-image: linear-gradient(
            90deg,
            rgb(111, 137, 251) 0%,
            rgb(97, 109, 245) 33%,
            rgb(92, 82, 235) 100%
          );
        `}
      />
    </ul>
  );
};

export {Tab};
