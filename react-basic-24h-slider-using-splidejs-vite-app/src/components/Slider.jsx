import {css, cx} from '@emotion/css';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {createRef, useMemo} from 'react';

const Slider = ({data, setActiveSlideIndex, setTik}) => {
  const timesDomRef = useMemo(() => {
    return [...Array(data.length).keys()].map((n) => {
      return createRef();
    });
  }, []);

  const resetActive = () => {
    const timesDom = timesDomRef.map((timeDomRef) => {
      return timeDomRef.current;
    });
    timesDom.forEach((timeDom) => {
      timeDom.classList.remove('is-active');
    });
  };

  const handleClick = (e, item, index) => {
    setActiveSlideIndex(index);
    resetActive();
    const dom = e.currentTarget;
    dom.classList.add('is-active');
    setTik(false);
    setTimeout(() => {
      setTik(true);
    }, 300);
  };

  return (
    <Splide
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 4rem;
        @media (max-width: 768px) {
          min-height: 4rem;
        }
        .splide__arrow--prev {
          left: -1rem;
        }
        .splide__arrow--next {
          right: -1rem;
        }
      `}
      options={{rewind: true, perPage: 6, pagination: false}}
      aria-label="Bebop Example"
    >
      {data.map((item, index) => {
        return (
          <SplideSlide key={index}>
            <div
              className={css`
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <div
                ref={timesDomRef[index]}
                className={cx(
                  css`
                    width: 48px;
                    height: 48px;
                    @media (max-width: 768px) {
                      width: 40px;
                      height: 40px;
                    }
                    border-radius: 50%;
                    filter: grayscale(40%);
                    opacity: 0.4;
                    background-image: linear-gradient(#eb01a5, #d13531);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-size: 1.2rem;
                    font-weight: bold;
                    &:hover {
                      cursor: pointer;
                    }
                    &.is-active {
                      font-size: 1.25rem;
                      filter: grayscale(0%);
                      opacity: 1;
                    }
                  `,
                  `${item.id === 0 ? 'is-active' : ''}`
                )}
                onClick={(e) => {
                  handleClick(e, item, index);
                }}
              >
                {`${item.id + 1}h`}
              </div>
            </div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

export {Slider};
