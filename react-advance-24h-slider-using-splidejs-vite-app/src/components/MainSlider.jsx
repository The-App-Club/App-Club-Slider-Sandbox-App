import {css, cx} from '@emotion/css';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {useEffect, useRef} from 'react';
import {createRef, useMemo} from 'react';

const MainSlider = ({
  data,
  destIndex,
  activeIndex,
  prevIndex,
  setActiveMainSlideIndex,
}) => {
  const splideMoveInstanceRef = useRef(null);

  useEffect(() => {
    // https://splidejs.com/components/move/
    setTimeout(() => {
      splideMoveInstanceRef.current.move(destIndex, activeIndex, prevIndex);
    }, 300);
  }, [destIndex, activeIndex, prevIndex]);

  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        /* border: 3px solid orange; */
      `}
    >
      <div
        className={css`
          max-width: 30rem;
          margin: auto;
          width: 100%;
        `}
      >
        <Splide
          onMounted={(e) => {
            splideMoveInstanceRef.current = e.Components.Move;
          }}
          onMove={(e) => {
            console.log(`move`);
          }}
          onMoved={(e) => {
            console.log(`moved`);
          }}
          onVisible={(e) => {
            console.log(`visible`);
            setActiveMainSlideIndex(e.index);
          }}
          className={css`
            width: 100%;
            min-height: 18rem;
            @media (max-width: 768px) {
              min-height: 14rem;
            }
            div {
              position: absolute;
              width: 100%;
              height: 100%;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center center;
              :hover {
                cursor: pointer;
              }
            }
          `}
          options={{
            rewind: true,
            perPage: 1,
            direction: 'ttb',
            height: '18rem',
            pagination: false,
            drag: false,
            arrows: false,
          }}
          aria-label="Bebop Example"
        >
          {data.map((item, index) => {
            return (
              <SplideSlide key={index}>
                <div
                  className={css`
                    background-image: url(${item.url});
                  `}
                />
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
};

export {MainSlider};
