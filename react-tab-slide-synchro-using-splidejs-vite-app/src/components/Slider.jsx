import {css} from '@emotion/css';
import {Splide, SplideSlide} from '@splidejs/react-splide';

const Slider = ({
  data,
  tik,
  setTik,
  tabsDomRef,
  splideInstanceControllerRef,
  splideInstanceMoveRef,
  setActiveSlideIndex,
}) => {
  return (
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
  );
};

export {Slider};
