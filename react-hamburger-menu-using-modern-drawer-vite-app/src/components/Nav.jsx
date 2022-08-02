import {css, cx} from '@emotion/css';
import {memo} from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import {Link, useNavigate} from 'react-router-dom';

const Nav = ({isOpen, toggleDrawer}) => {
  const navigate = useNavigate();
  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="right"
      className={cx(css``, ``)}
    >
      <div
        className={cx(
          css`
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
          `,
          ``
        )}
      >
        <h2
          className={css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
            min-height: 4rem;
            padding-left: 1rem;
          `}
        >
          Menu
        </h2>
        <button
          className={cx(
            `hamburger`,
            `hamburger--elastic`,
            `${isOpen ? 'is-active' : ''}`,
            css`
              position: absolute;
              right: 0;
            `
          )}
          type="button"
          aria-label="Menu"
          aria-controls="navigation"
          aria-expanded={isOpen}
          onClick={toggleDrawer}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
      <ul
        className={css`
          width: 100%;
          list-style: none;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          li {
            width: 100%;
            padding: 1rem;
            min-height: 2rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            :hover {
              cursor: pointer;
              background: #f7f7f7f7;
            }
            a {
              font-size: 1.2rem;
              text-decoration: none;
            }
          }
        `}
      >
        <li
          onClick={(e) => {
            navigate('/');
          }}
        >
          <Link to={`/`}>home</Link>
        </li>
        <li
          onClick={(e) => {
            navigate('/about');
          }}
        >
          <Link to={`/about`}>about</Link>
        </li>
        <li
          onClick={(e) => {
            navigate('/contact');
          }}
        >
          <Link to={`/contact`}>contact</Link>
        </li>
        <li
          onClick={(e) => {
            navigate('/work');
          }}
        >
          <Link to={`/work`}>work</Link>
        </li>
      </ul>
    </Drawer>
  );
};

export default memo(Nav);
