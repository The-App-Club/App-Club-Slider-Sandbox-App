import {useState, useEffect, useCallback, useRef} from 'react';
import {css, cx} from '@emotion/css';
import {PrevButton, NextButton, DotButton} from './EmblaCarouselButtons';
import useEmblaCarousel from 'embla-carousel-react';
import styled from '@emotion/styled';
import * as R from 'ramda';

const StyledEmbla = styled.div`
  width: 100%;
  position: relative;
  .embla {
    position: relative;
    background-color: #f7f7f7;
    width: 100%;
    margin: auto;
  }
  .embla__viewport {
    overflow: hidden;
    width: 100%;
  }
  .embla__viewport.is-draggable {
    cursor: move;
    cursor: grab;
  }
  .embla__viewport.is-dragging {
    cursor: grabbing;
  }
  .embla__container {
    display: flex;
    user-select: none;
    margin-left: -10px;
  }
  .embla__slide {
    position: relative;
    min-width: 100%;
    padding-left: 10px;
  }
  .embla__slide__inner {
    position: relative;
    overflow: hidden;
  }
  .embla__slide__img {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    width: auto;
    min-height: 100%;
    min-width: 100%;
    max-width: none;
    transform: translate(-50%, -50%);
  }
  .embla__button {
    outline: 0;
    cursor: pointer;
    background-color: transparent;
    touch-action: manipulation;
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    fill: #1bcacd;
    padding: 0;
  }
  .embla__button:disabled {
    cursor: default;
    opacity: 0.3;
  }
  .embla__button__svg {
    width: 100%;
    height: 100%;
  }
  .embla__button--prev {
    left: 27px;
  }
  .embla__button--next {
    right: 27px;
  }
  .embla__dots {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 1rem;
    display: flex;
    list-style: none;
    justify-content: center;
  }
  .embla__dot {
    background-color: transparent;
    cursor: pointer;
    position: relative;
    padding: 0;
    outline: 0;
    border: 0;
    width: 30px;
    height: 30px;
    margin-right: 7.5px;
    margin-left: 7.5px;
    display: flex;
    align-items: center;
  }
  .embla__dot:after {
    background-color: #efefef;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    content: '';
  }
  .embla__dot.is-selected:after {
    background-color: #1bcacd;
    opacity: 1;
  }
`;
const EmblaCarousel = ({
  slides,
  tik,
  activeSlideIndex,
  setTik,
  setActiveSlideIndex,
  height = `100vh`,
  children,
}) => {
  const skip = useRef(false);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    speed: 30,
    skipSnaps: false,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    embla && embla.scrollPrev();
  }, [embla]);
  const scrollNext = useCallback(() => {
    embla && embla.scrollNext();
  }, [embla]);
  const scrollTo = useCallback(
    (index) => {
      embla && embla.scrollTo(index);
    },
    [embla]
  );

  const onInit = useCallback(() => {
    if (!embla) return;
  }, [embla]);

  const onPointerDown = useCallback(() => {
    if (!embla) return;
    // console.log(`snap start`);
    setTik(false);
  }, [embla]);

  const onPointerUp = useCallback(() => {
    if (!embla) return;
    // console.log(`snap end`);
    setTimeout(() => {
      setTik(true);
    }, 300);
  }, [embla]);

  const onSettle = useCallback(() => {
    if (!embla) return;
    // console.log(`transition end`);
    setTik(true);
  }, [embla]);

  const onScroll = useCallback(() => {
    if (!embla) return;
    // console.log(`transition`);
  }, [embla]);

  const onSelect = useCallback(
    (e) => {
      if (!embla) return;
      setSelectedIndex(embla.selectedScrollSnap());
      setPrevBtnEnabled(embla.canScrollPrev());
      setNextBtnEnabled(embla.canScrollNext());
      setScrollSnaps(embla.scrollSnapList());
      // console.log(
      //   R.clamp(0, 1, embla.scrollProgress()),
      //   embla.slidesInView(true)
      // );
      const [activeSlideIndex] = embla.slidesInView(true);
      if (skip.current) {
        skip.current = false;
        setActiveSlideIndex(activeSlideIndex);
        return;
      }
      // console.log(`transition start`);
      setTik(false);
      setActiveSlideIndex(activeSlideIndex);
    },
    [embla]
  );

  useEffect(() => {
    if (!embla) return;
    embla.on('init', onInit);
    embla.on('pointerDown', onPointerDown);
    embla.on('pointerUp', onPointerUp);
    embla.on('settle', onSettle);
    embla.on('scroll', onScroll);
    embla.on('select', onSelect);
    skip.current = true;
    onSelect();
    return () => {
      embla.off('init', onInit);
      embla.off('select', onSelect);
      embla.off('pointerDown', onPointerDown);
      embla.off('pointerUp', onPointerDown);
      embla.off('settle', onSettle);
      embla.off('scroll', onScroll);
    };
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <StyledEmbla>
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {slides.map((item, index) => (
              <div className="embla__slide" key={index}>
                <div
                  className={cx(
                    css`
                      height: ${height};
                    `,
                    'embla__slide__inner'
                  )}
                >
                  {item.page({tik: tik && index === activeSlideIndex})}
                </div>
              </div>
            ))}
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => {
          return (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={(e) => {
                scrollTo(index);
              }}
            />
          );
        })}
      </div>
    </StyledEmbla>
  );
};

export {EmblaCarousel};
