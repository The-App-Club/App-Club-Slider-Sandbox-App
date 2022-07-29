import {AnimatePresence} from 'framer-motion';
import {css} from '@emotion/css';
import {default as Layout} from '../layouts/default';

const Description = ({tik, text}) => {
  return (
    <div
      className={css`
        min-height: 8rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 1.5rem 1rem 0;
        p {
          font-weight: bold;
        }
      `}
    >
      {
        <AnimatePresence>
          {tik && (
            <Layout>
              <p>{text}</p>
            </Layout>
          )}
        </AnimatePresence>
      }
    </div>
  );
};

export {Description};
