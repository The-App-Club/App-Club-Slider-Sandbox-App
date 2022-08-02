import {css, cx} from '@emotion/css';
import {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Nav from './Nav';
import 'hamburgers/dist/hamburgers.css';
import logo from '../assets/logo.png';

const Header = ({isOpen, setIsOpen}) => {
  const navigate = useNavigate();

  const toggleDrawer = useCallback(() => {
    setIsOpen((prevState) => {
      return !prevState;
    });
    const html = document.documentElement;
    const body = html.querySelector('body');
    html.classList.toggle('loading');
    body.classList.toggle('loading');
  }, []);
  return (
    <header
      className={css`
        width: 100%;
        position: fixed;
        z-index: 1;
        top: 0;
        backdrop-filter: blur(3px);
      `}
    >
      <div
        className={css`
          position: relative;
          width: 100%;
          min-height: 4rem;
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            :hover {
              cursor: pointer;
            }
          `}
          onClick={(e) => {
            navigate('/');
          }}
        >
          <img src={logo} alt={`logo`} height={40} />
          <h2>Bebop Site</h2>
        </div>
        <button
          className={cx(
            `hamburger`,
            `hamburger--elastic`,
            `${isOpen ? 'is-active' : ''}`,
            css`
              position: absolute;
              top: 0;
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

      <Nav isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </header>
  );
};

export {Header};
