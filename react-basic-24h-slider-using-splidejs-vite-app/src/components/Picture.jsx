import {AnimatePresence} from 'framer-motion';
import {css} from '@emotion/css';
import {default as Layout} from '../layouts/default';

const Picture = ({tik, url}) => {
  return (
    <AnimatePresence>
      {tik && (
        <Layout>
          <div
            className={css`
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 300px;
              @media (max-width: 768px) {
                height: 200px;
              }
            `}
          >
            <div
              className={css`
                width: 100%;
                height: 100%;
                background-image: url(${url});
                background-origin: center center;
                background-repeat: no-repeat;
                background-size: cover;
              `}
            />
          </div>
        </Layout>
      )}
    </AnimatePresence>
  );
};

export {Picture};
