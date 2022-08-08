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
import {Button} from '@mui/material';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {HomePage} from './pages/home';
import {AboutPage} from './pages/about';
import {WorkPage} from './pages/work';
import {ContactPage} from './pages/contact';

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
      <ul
        className={css`
          list-style: none;
          display: flex;
          justify-content: center;
          align-items: center;
          li {
            /* border: 1px solid darkgray; */
            padding: 0.5rem;
            cursor: pointer;
            &.active {
              background: #cad4f5;
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
      <div
        className={css`
          max-width: 30rem;
          margin: auto;
          width: 100%;
          border: 1px solid darkgray;
        `}
      >
        <Splide
          onMounted={(e) => {
            splideInstanceControllerRef.current = e.Components.Controller;
            splideInstanceMoveRef.current = e.Components.Move;
          }}
          onMove={(e) => {
            setTik(false);
          }}
          onMoved={(e) => {
            setTik(true);
          }}
          onVisible={(e) => {
            // console.log(`visible`, e.index);
            setActiveSlideIndex(e.index);
            const tabDomList = tabsDomRef.map((tabDomRef) => {
              return tabDomRef.current;
            });
            tabDomList.forEach((tabDom) => {
              tabDom.classList.remove('active');
            });
            const dom = tabDomList[e.index];
            dom.classList.add('active');
          }}
          className={css`
            width: 100%;
          `}
          options={{rewind: true, perPage: 1, pagination: false}}
          aria-label="Bebop Example"
        >
          {data.map((item, index) => {
            return <SplideSlide key={index}>{item.page({tik})}</SplideSlide>;
          })}
        </Splide>
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
