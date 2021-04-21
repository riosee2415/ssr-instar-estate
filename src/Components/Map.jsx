import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  WholeWrapper,
  Wrapper,
  Image,
  Text,
  MapTitle,
} from "../Components/CommonComponents";
import { withResizeDetector } from "react-resize-detector";
import { AiOutlineClose } from "react-icons/ai";

const Map = ({ width }) => {
  const mapRef = useRef();

  const [mapOpen, setMapOpen] = useState(false);

  //handler
  const mapOpenToggle = () => {
    setMapOpen(!mapOpen);
  };

  useEffect(() => {
    if (typeof document !== "undefined" && typeof window !== "undefined") {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=c9c7964ed2dc4bd3a41bb61c969ebe14&autoload=false";
      document.head.appendChild(script);
      script.onload = () => {
        kakao.maps.load(() => {
          let container = mapRef.current;
          let options = {
            center: new kakao.maps.LatLng(
              37.55700912239185,
              126.91804499792822
            ),
            level: 7,
          };
          const map = new window.kakao.maps.Map(container, options);
        });
      };
    }
  }, []);

  return (
    <WholeWrapper>
      {mapOpen ? (
        <Wrapper
          color={`#fff`}
          fontSize={`25px`}
          al={`flex-end`}
          padding={`10px`}
          cursor={`pointer`}
          bgColor={`#F2C321`}
        >
          <AiOutlineClose onClick={mapOpenToggle} />
        </Wrapper>
      ) : (
        <Wrapper al={`flex-end`} onClick={mapOpenToggle} cursor={`pointer`}>
          <Image
            width={`100px`}
            alt="map icon"
            src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2Flogo-map.png?alt=media&token=c5520cf1-17c3-474c-bae1-ad7a1c30b70f`}
          />
        </Wrapper>
      )}
      {mapOpen && (
        <Wrapper
          dr={width < 800 ? `column` : `row`}
          height={width < 800 ? `400px` : `400px`}
        >
          <Wrapper
            ref={mapRef}
            width={width < 800 ? `100%` : `50%`}
            height={width < 800 ? `50%` : `100%`}
            bgColor={`#ccc`}
          ></Wrapper>
          <Wrapper
            width={width < 800 ? `100%` : `50%`}
            height={width < 800 ? `50%` : `100%`}
            bgColor={`#F2C321`}
            al={`flex-start`}
            padding={`50px`}
          >
            <Image
              width={`80px`}
              margin={`0px 15px 20px 0px`}
              src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2Flogo-map.png?alt=media&token=c5520cf1-17c3-474c-bae1-ad7a1c30b70f`}
            />
            <MapTitle>찾아오시는 길</MapTitle>
            <Text fontSize={`18px`}>서울시 마포구 서교동 448-17 1층</Text>
            <a href="tel:023321978">
              <Text fontSize={`18px`}>TEL : 02-332-1978</Text>
            </a>
          </Wrapper>
        </Wrapper>
      )}
    </WholeWrapper>
  );
};

export default withResizeDetector(Map);
