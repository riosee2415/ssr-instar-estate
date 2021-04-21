import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import dynamic from "next/dynamic";

const ImageGallery = dynamic(import("react-image-gallery"));

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const ImageGalleryWrapper = styled.div`
  .image-gallery {
    margin-bottom: 0;
  }

  .image-gallery-slide {
    width: 100%;
  }

  .image-gallery-image {
    width: 100%;
  }

  .image-gallery-thumbnails-wrapper {
    display: none;
  }

  .image-gallery-thumbnail {
    width: 120px;
  }

  .image-gallery-thumbnail img {
    width: 100%;
    height: 100px;
  }

  .image-gallery-left-nav .image-gallery-svg,
  .image-gallery-right-nav .image-gallery-svg {
    width: 35px;
  }

  .image-gallery-fullscreen-button .image-gallery-svg,
  .image-gallery-play-button .image-gallery-svg {
    width: 30px;
  }
`;

const ProductDetailSlider = ({ isImageView, setIsImageView, datum }) => {
  const [items, setItems] = useState(null);

  const settings = {
    showPlayButton: false,
    autoPlay: true,
    slideDuration: 600,
    slideInterval: 4000,
    showFullscreenButton: false,
    onClick: (e) => {
      setIsImageView(!isImageView);
    },
  };

  useEffect(() => {
    if (datum) {
      const list = [];

      datum.map((data) => {
        list.push({
          original: data,
          thumbnail: data,
        });
      });

      setItems(list);
    }
  }, [datum]);

  if (!items) return null;

  return (
    <Container>
      <ImageGalleryWrapper>
        <ImageGallery items={items} {...settings} />
      </ImageGalleryWrapper>
    </Container>
  );
};

export default ProductDetailSlider;
