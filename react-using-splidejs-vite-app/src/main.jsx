import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useEffect, useCallback, useMemo, useRef, useState} from 'react';
import {Button} from '@mui/material';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {Description} from './components/Description';

import '@fontsource/inter';
import './styles/index.scss';
import data from './data/dump';

const App = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [tik, setTik] = useState(true);
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
      <h2>Bebop Slider Example</h2>
      <div
        className={css`
          max-width: 30rem;
          margin: auto;
          width: 100%;
        `}
      >
        <Splide
          onMove={(e) => {
            setTik(false);
            console.log(`move`);
          }}
          onMoved={(e) => {
            setTik(true);
            console.log(`moved`);
          }}
          onVisible={(e) => {
            console.log(`visible`);
            setActiveSlideIndex(e.index);
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
          options={{rewind: true, perPage: 1}}
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
        <Description tik={tik} text={data[activeSlideIndex].description} />
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
