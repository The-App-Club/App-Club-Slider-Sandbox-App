import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
  createRef,
} from 'react';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {Description} from './components/Description';
import {Picture} from './components/Picture';
import {Spacer} from './components/Spacer';
import {Title} from './components/Title';
import {SemiTitle} from './components/SemiTitle';
import {Slider} from './components/Slider';

import data from './data/dump';
import '@fontsource/inter';
import './styles/index.scss';

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
        <Slider
          data={data}
          setActiveSlideIndex={setActiveSlideIndex}
          setTik={setTik}
        />
        <Title tik={tik} title={data[activeSlideIndex].id + 1} />
        <Spacer height={`0.5rem`} />
        <SemiTitle tik={tik} semiTitle={data[activeSlideIndex].semiTitle} />
        <Spacer />
        <Picture tik={tik} url={data[activeSlideIndex].url} />
        <Description tik={tik} text={data[activeSlideIndex].description} />
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
