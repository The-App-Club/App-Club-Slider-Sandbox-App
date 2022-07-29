import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useEffect, useCallback, useMemo, useRef, useState} from 'react';
import '@fontsource/inter';
import './styles/index.scss';
import data from './data/dump';
import Slider from 'react-slick';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {Description} from './components/Description';

const App = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [tik, setTik] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      `}
    >
      <h2>Bebop Slider Example</h2>
      <div
        className={css`
          max-width: 30rem;
          margin: auto;
          width: 100%;
          height: 100%;
          /* border: 1px solid; */
        `}
      >
        <Slider
          beforeChange={(prevIndex) => {
            console.log(`[start],prevIndex`, prevIndex);
            setTik(false);
          }}
          afterChange={(activeIndex) => {
            console.log(`[end],activeIndex`, activeIndex);
            setTik(true);
            setActiveSlideIndex(activeIndex);
          }}
          accessibility
          swipeEvent={(e) => {
            console.log(e);
          }}
          onSwipe={(e) => {
            console.log(e);
          }}
          {...settings}
          className={cx(
            css`
              width: 100%;
              .slick-slide {
                height: 18rem;
                @media (max-width: 768px) {
                  height: 14rem;
                }
              }
              .slick-arrow.slick-prev {
                left: 0;
                z-index: 1;
              }
              .slick-arrow.slick-next {
                right: 0;
                z-index: 1;
              }
            `
          )}
        >
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className={css`
                  width: 100%;
                  min-height: 18rem;
                  @media (max-width: 768px) {
                    min-height: 14rem;
                  }
                  background-size: cover;
                  background-repeat: no-repeat;
                  background-position: center center;
                  background-image: url(${item.url});
                  :hover {
                    cursor: pointer;
                  }
                `}
              />
            );
          })}
        </Slider>
        <Description tik={tik} text={data[activeSlideIndex].description} />
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
