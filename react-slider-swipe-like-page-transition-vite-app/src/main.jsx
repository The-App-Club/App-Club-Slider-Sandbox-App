import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {EmblaCarousel} from './components/EmblaCarousel';

import '@fontsource/inter';
import './styles/index.scss';
import {useState} from 'react';
import {HomePage} from './pages/home';
import {AboutPage} from './pages/about';
import {WorkPage} from './pages/work';
import {ContactPage} from './pages/contact';
import {Layout} from './layouts/default';
import {useEffect} from 'react';

const slides = [
  {
    page: ({tik}) => {
      return <HomePage tik={tik} />;
    },
  },
  {
    page: ({tik}) => {
      return <AboutPage tik={tik} />;
    },
  },
  {
    page: ({tik}) => {
      return <WorkPage tik={tik} />;
    },
  },
  {
    page: ({tik}) => {
      return <ContactPage tik={tik} />;
    },
  },
];

const App = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [tik, setTik] = useState(true);

  useEffect(() => {
    console.log(`tik,activeSlideIndex`, tik, activeSlideIndex);
  }, [tik, activeSlideIndex]);

  return (
    <Layout>
      <div
        className={css`
          max-width: 100vw;
          margin: auto;
          width: 100%;
        `}
      >
        <EmblaCarousel
          slides={slides}
          tik={tik}
          activeSlideIndex={activeSlideIndex}
          setTik={setTik}
          setActiveSlideIndex={setActiveSlideIndex}
          height={`100vh`}
        />
      </div>
    </Layout>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
