import {css, cx} from '@emotion/css';
import {
  createRef,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

const Tab = ({activeSlideIndex, data, splideInstanceMoveRef}) => {
  const tabsDomRef = useMemo(() => {
    return data.map((item, index) => {
      return createRef();
    });
  }, []);

  return (
    <ul
      className={css`
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          /* border: 1px solid darkgray; */
          padding: 0.5rem;
          cursor: pointer;
          &.active {
            background: #f7f7f7;
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
              const tabDomList = tabsDomRef.map((tabDomRef) => {
                return tabDomRef.current;
              });
              tabDomList.forEach((tabDom) => {
                tabDom.classList.remove('active');
              });
              const dom = e.currentTarget;
              dom.classList.add('active');
              splideInstanceMoveRef.current.move(
                Math.min(data.length - 1, index + 1),
                index,
                Math.max(0, index - 1)
              );
            }}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};

export {Tab};
