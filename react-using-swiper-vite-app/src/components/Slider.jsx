import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {css, cx} from '@emotion/css';
import {useState} from 'react';

const Slider = ({tik, data, setActiveSlideIndex, setTik}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      className={cx(
        css`
          width: 100%;
          margin: auto;
          /* border: 3px solid orange; */
          height: 100%;
          .swiper-button-prev,
          .swiper-button-next {
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.6s ease-in-out;
            @media (max-width: 768px) {
              visibility: visible;
              opacity: 1;
            }
          }
          &:hover .swiper-button-prev {
            visibility: visible;
            opacity: 1;
          }
          &:hover .swiper-button-next {
            visibility: visible;
            opacity: 1;
          }
          .swiper-wrapper {
            width: 100%;
            height: 100%;
            .swiper-slide {
              width: 100%;
              height: 100%;
              padding: 2rem 2.5rem;
              @media (max-width: 768px) {
                padding: 2rem 3rem;
              }
              div {
                width: 100%;
                min-height: 18rem;
                @media (max-width: 768px) {
                  min-height: 14rem;
                }
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;
                :hover {
                  cursor: pointer;
                }
              }
            }
          }
        `,
        ``
      )}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      rewind={true}
      pagination={{clickable: true}}
      // scrollbar={{draggable: true}}
      onBeforeTransitionStart={(e) => {
        console.log(`start`);
        setTik(false);
        setTimeout(() => {
          // magic
          setTik(true);
        }, 400);
      }}
      onSlidePrevTransitionEnd={(e) => {
        console.log(`backword end`);
        setTik(true);
      }}
      onSlideNextTransitionEnd={(e) => {
        console.log(`forward end`);
        setTik(true);
      }}
      onSlideChange={(instance) => {
        setActiveSlideIndex(instance.activeIndex);
      }}
    >
      {data.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              className={cx(
                css`
                  background-image: url(${item.url});
                `,
                ``
              )}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export {Slider};
