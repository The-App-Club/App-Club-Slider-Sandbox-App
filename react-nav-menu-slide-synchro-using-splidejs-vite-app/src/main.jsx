import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {
  createRef,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import {HomePage} from './pages/home';
import {AboutPage} from './pages/about';
import {WorkPage} from './pages/work';
import {ContactPage} from './pages/contact';

import {Tab} from './components/Tab';
import {Slider} from './components/Slider';

import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import '@fontsource/inter';
import './styles/index.scss';

const data = [
  {
    name: `home`,
    page: ({tik}) => {
      return <HomePage tik={tik} />;
    },
  },
  {
    name: `about`,
    page: ({tik}) => {
      return <AboutPage tik={tik} />;
    },
  },
  {
    name: `work`,
    page: ({tik}) => {
      return <WorkPage tik={tik} />;
    },
  },
  {
    name: `contact`,
    page: ({tik}) => {
      return <ContactPage tik={tik} />;
    },
  },
];

const App = () => {
  const splideInstanceMoveRef = useRef(null);
  const splideInstanceControllerRef = useRef(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [tik, setTik] = useState(true);
  const tabsDomRef = useMemo(() => {
    return data.map((item, index) => {
      return createRef();
    });
  }, []);

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
      <Tab
        activeSlideIndex={activeSlideIndex}
        data={data}
        splideInstanceMoveRef={splideInstanceMoveRef}
        splideInstanceControllerRef={splideInstanceControllerRef}
        tabsDomRef={tabsDomRef}
      />
      <Slider
        data={data}
        tik={tik}
        setTik={setTik}
        setActiveSlideIndex={setActiveSlideIndex}
        splideInstanceControllerRef={splideInstanceControllerRef}
        splideInstanceMoveRef={splideInstanceMoveRef}
        tabsDomRef={tabsDomRef}
      />
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
