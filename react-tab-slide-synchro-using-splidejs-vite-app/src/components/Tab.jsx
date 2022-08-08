import {css, cx} from '@emotion/css';

const Tab = ({
  tabsDomRef,
  activeSlideIndex,
  data,
  splideInstanceMoveRef,
  splideInstanceControllerRef,
}) => {
  return (
    <ul
      className={css`
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          padding: 0.5rem;
          cursor: pointer;
          &.active {
            background: #f6f6f6;
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
    </ul>
  );
};

export {Tab};
