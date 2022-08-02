import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useCallback, useState} from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from 'react-router-dom';

import {HomePage} from './pages/home';
import {AboutPage} from './pages/about';
import {ContactPage} from './pages/contact';
import {WorkPage} from './pages/work';

import {default as Nav} from './components/Nav';
import {ScrollToTop} from './components/ScrollToTop';
import {Header} from './components/Header';
import {Footer} from './components/Footer';

import logo from './assets/logo.png';
import '@fontsource/inter';
import './styles/index.scss';

const App = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const drawCloseNotifier = useCallback((e) => {
    setIsOpen(false);
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <main>
        <article>
          <Routes location={location}>
            <Route
              path={`/`}
              element={
                <HomePage
                  pathname={location.pathname}
                  notifer={drawCloseNotifier}
                />
              }
            />
            <Route
              path={`/about`}
              element={
                <AboutPage
                  pathname={location.pathname}
                  notifer={drawCloseNotifier}
                />
              }
            />
            <Route
              path={`/contact`}
              element={
                <ContactPage
                  pathname={location.pathname}
                  notifer={drawCloseNotifier}
                />
              }
            />
            <Route
              path={`/work`}
              element={
                <WorkPage
                  pathname={location.pathname}
                  notifer={drawCloseNotifier}
                />
              }
            />
          </Routes>
        </article>
      </main>
      <Footer />
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
