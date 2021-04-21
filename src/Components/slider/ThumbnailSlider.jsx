import React, { useMemo } from "react";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Lazy, Autoplay, EffectFade } from "swiper";
import styled from "styled-components";
import { Image, Wrapper } from "../../Components/CommonComponents";

SwiperCore.use([Autoplay, Lazy, EffectFade]);

const ThumbnailSlider = ({ isImageLoading, datum }) => {
  const Container = styled.div`
    width: 100%;
    position: relative;
  `;

  return useMemo(
    () => (
      <Container>
        {datum && !isImageLoading && (
          <Wrapper isAbsolute={true} left={`0`} top={`0`} zIndex={`1`}>
            <Image src={datum[0]} />
          </Wrapper>
        )}

        {isImageLoading && (
          <Swiper
            lazy={{
              loadPrevNext: true,
              loadPrevNextAmount: 1,
              elementClass: "swiper-lazy",
              loadingClass: "swiper-lazy-loading",
              loadedClass: "swiper-lazy-loaded",
              preloaderClass: "swiper-lazy-preloader",
            }}
            loop={true}
            autoplay={{ delay: 9000 }}
            effect={`fade`}
          >
            {datum &&
              datum.map((data, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <Wrapper>
                      <Image src={data} />;
                    </Wrapper>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}
      </Container>
    ),
    [datum.length, isImageLoading]
  );
};

// export default React.memo(ThumbnailSlider, (prevProps, nextProps) => {
//   if (prevProps.datum && nextProps.datum) {
//     if (prevProps.isImageLoading !== nextProps.isImageLoading) {
//       return false;
//     } else if (prevProps.datum === nextProps.datum) {
//       return true;
//     } else {
//       return false;
//     }
//   } else {
//     return false;
//   }
// });

export default ThumbnailSlider;
