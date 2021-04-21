import React from "react";
import {
  WholeWrapper,
  Wrapper,
  Image,
  UlWrapper,
  LiWrapper,
} from "../../../Components/CommonComponents";
import Link from "next/link";
import { withResizeDetector } from "react-resize-detector";
import { GET_FOOTER_INFO } from "./LayoutQueries";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";

const Footer = ({ width }) => {
  ////////////// - VARIABLES - ///////////////
  const router = useRouter();

  ////////////// - USE STATE - ///////////////

  ////////////// - USE QUERY - ///////////////
  const { data, loading, refetch } = useQuery(GET_FOOTER_INFO);

  return (
    <WholeWrapper
      maxWidth={
        router.pathname.includes("product-detail") ? `375px !important` : `100%`
      }
      minWidth={`350px`}
      margin={`0 auto`}
      padding={`20px 0px`}
      bgColor={`#2c2a29`}
      color={`rgba(255, 255, 255, 0.84)`}
    >
      <Wrapper
        dr={`row`}
        wrap={`wrap-reverse`}
        ju={`space-around`}
        fontSize={`13px`}
        maxWidth={
          router.pathname.includes("product-detail")
            ? `375px !important`
            : `80%`
        }
      >
        <Wrapper width={`auto`}>
          <Wrapper
            al={
              width < 700 || router.pathname.includes("product-detail")
                ? `center`
                : `flex-start`
            }
          >
            주소지 {data && data.getFooterInfo.address}
          </Wrapper>
          <UlWrapper
            dr={
              width < 700 || router.pathname.includes("product-detail")
                ? `column`
                : `row`
            }
            ju={`flex-start`}
            margin={`10px 0px`}
          >
            <LiWrapper>대표 {data && data.getFooterInfo.cheifName}</LiWrapper>
            <LiWrapper
              margin={width < 700 ? `10px 0px` : `0px 5px`}
              padding={`0px 5px`}
              borderRight={width < 700 ? `none` : `1px solid #fff`}
              borderLeft={width < 700 ? `none` : `1px solid #fff`}
            >
              사업자 등록번호 {data && data.getFooterInfo.businessNumber}
            </LiWrapper>
            <LiWrapper>부동산 등록번호 </LiWrapper>
          </UlWrapper>
          <UlWrapper dr={width < 700 ? `column` : `row`} ju={`flex-start`}>
            <LiWrapper
              margin={width < 700 ? `10px 0px` : `0px 5px 0 0`}
              padding={`0px 5px 0 0`}
              borderRight={width < 700 ? `none` : `1px solid #fff`}
            >
              TEL {data && data.getFooterInfo.tel}
            </LiWrapper>

            <LiWrapper>E-Mail {data && data.getFooterInfo.email}</LiWrapper>
          </UlWrapper>

          <Wrapper
            margin={`20px 0px 0px`}
            lineHeight={`1.5`}
            textAlign={`center`}
          >
            Copyright ⓒ 2020 {data && data.getFooterInfo.businessName} All
            rights reserved. By 4LEAF SOFTWARE
          </Wrapper>
        </Wrapper>
        <Link href="/">
          <Image
            margin={
              (width < 700 || router.pathname.includes("product-detail")) &&
              `0px 0px 50px`
            }
            width={`250px`}
            alt="logo"
            src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2FlogoFooter.png?alt=media&token=93bf2e42-3d78-4663-8762-cf1c62aa5f99`}
          />
        </Link>
      </Wrapper>
    </WholeWrapper>
  );
};

export default withResizeDetector(Footer);
