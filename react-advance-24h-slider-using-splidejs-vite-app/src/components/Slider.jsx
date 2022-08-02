import {css, cx} from '@emotion/css';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {createRef, useEffect, useMemo, useRef} from 'react';

const Slider = ({
  data,
  activeMainSlideIndex,
  setActiveSlideIndex,
  setPrevSlideIndex,
  setNextSlideIndex,
  setTik,
}) => {
  const splideMoveInstanceRef = useRef(null);
  const splideSlidesDomRef = useRef(null);

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
    setPrevSlideIndex(Math.max(0, index - 1));
    setNextSlideIndex(Math.min(data.length - 1, index + 1));
    resetActive();
    const dom = e.currentTarget;
    dom.classList.add('is-active');
    setTik(false);
    setTimeout(() => {
      setTik(true);
    }, 300);
  };

  useEffect(() => {
    const prevSlideIndex = Math.max(0, activeMainSlideIndex - 1);
    const nextSlideIndex = Math.min(data.length - 1, activeMainSlideIndex + 1);
    // https://splidejs.com/components/controller/
    splideMoveInstanceRef.current.move(
      nextSlideIndex,
      activeMainSlideIndex,
      prevSlideIndex
    );

    const activeMarkerDom =
      splideSlidesDomRef.current[activeMainSlideIndex].querySelector(`.marker`);
    resetActive();
    activeMarkerDom.classList.add('is-active');
    setTik(false);
    setTimeout(() => {
      setTik(true);
    }, 300);

    console.log(`activeMainSlideIndex`, activeMainSlideIndex);
  }, [activeMainSlideIndex]);

  return (
    <Splide
      onMounted={(e) => {
        // console.log(e.Components.Elements);
        splideSlidesDomRef.current = e.Components.Elements.slides;
        splideMoveInstanceRef.current = e.Components.Move;
      }}
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
                  `${item.id === 0 ? 'is-active' : ''}`,
                  `marker`
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
