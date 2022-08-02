import {css} from '@emotion/css';

const Footer = () => {
  return (
    <footer
      className={css`
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        font-size: 4rem;
      `}
    >
      Bye
    </footer>
  );
};

export {Footer};
