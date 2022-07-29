import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useEffect, useCallback, useMemo, useRef, useState} from 'react';
import '@fontsource/inter';
import './styles/index.scss';
import data from './data/dump';
import {Slider} from './components/Slider';
import {Description} from './components/Description';

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
      `}
    >
      <h2
        className={css`
          padding-top: 1rem;
        `}
      >
        Bebop Slider Example
      </h2>
      <div
        className={css`
          max-width: 30rem;
          margin: auto;
          width: 100%;
        `}
      >
        <Slider
          tik={tik}
          data={data}
          setTik={setTik}
          setActiveSlideIndex={setActiveSlideIndex}
        />
        <Description tik={tik} text={data[activeSlideIndex].description} />
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
