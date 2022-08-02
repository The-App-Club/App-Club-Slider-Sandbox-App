import {css} from '@emotion/css';
import {default as Layout} from '../../layouts/default';

const WorkPage = ({pathname, notifer}) => {
  return (
    <Layout pathname={pathname} notifer={notifer}>
      <section
        className={css`
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: column;
          padding-top: 4rem;
          min-height: 100vh;
        `}
      >
        <h2>WorkPage</h2>
        <p>Something...</p>
        <p>Something...</p>
        <p>Something...</p>
      </section>
    </Layout>
  );
};

export {WorkPage};
