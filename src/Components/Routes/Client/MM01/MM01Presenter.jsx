import React from "react";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  CommonSubTitle,
  SubjectTitle,
  Product,
  ProductTitle,
  ProductDesc,
  SoldOut,
  SoldOutText,
  Text,
  Image,
  SpanText,
  EmptyList,
  PagenationWrapper,
  PagenationBtn,
  Pagenation,
} from "../../../CommonComponents";
import dynamic from "next/dynamic";
import { withResizeDetector } from "react-resize-detector";
import {
  AiFillPlusCircle,
  AiFillStar,
  AiOutlineStar,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegTimesCircle } from "react-icons/fa";
import ImageViewer from "react-images-viewer";
import CircularIndeterminate from "../../../loading/CircularIndeterminate";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Theme from "../../../../Styles/Theme";
import { areaCalculation2 } from "../../../../commonUtils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ThumbnailSlider from "../../../slider/ThumbnailSlider";
import Head from "next/head";

const MM02 = dynamic(import("../../Client/MM02"));

const MM01Presenter = ({
  width,
  //
  cookies,
  //
  currentPage,
  currentList,
  limit,
  pages,
  isInfiniteLoading,
  isImageLoading,
  currentImage,
  isViewerOpen,
  images,
  currentId,
  setCurrentId,
  //
  menuData,
  subMenuData,
  productDatum,
  viewProductDatum,
  //
  _moveLinkHandler,
  infiniteScrollHandler,
  imageViewerHandler,
  imageViewerPrevHandler,
  imageViewerNextHandler,
  imageViewerGotoHandler,
  imageViewerClickHandler,
  updateProductStarHandler,
  prevAndNextPageChangeHandler,
  changePageHandler,
  closePageHandler,
  shareProductHandler,
}) => {
  const infiniteRef = useInfiniteScroll({
    loading: isInfiniteLoading,
    hasNextPage: productDatum && productDatum.length > limit ? true : false,
    onLoadMore: infiniteScrollHandler,
  });

  return (
    <>
      <Head>
        <title>
          {subMenuData ? subMenuData.name : menuData ? menuData.name : ``}
        </title>
      </Head>

      <WholeWrapper
        isRelative={true}
        padding={width < 900 ? `70px 0 0` : `210px 0 0`}
      >
        <RsWrapper>
          <CommonSubTitle margin={`130px 0 10px`} paddingBottom={`0`}>
            {menuData && menuData.name}
            {subMenuData && subMenuData.parentMenu.name}
          </CommonSubTitle>

          <SubjectTitle margin={`0 0 60px`}>
            {subMenuData && subMenuData.name}
          </SubjectTitle>

          <Wrapper margin={`0px 0px 200px 0px`}>
            <Wrapper dr={`row`} ju={`flex-start`}>
              {productDatum ? (
                productDatum.length === 0 ? (
                  <Wrapper padding={`200px 0`} fontSize={`20px`}>
                    <Wrapper
                      width={`auto`}
                      fontSize={`60px`}
                      margin={`0 0 20px`}
                    >
                      <FaRegTimesCircle />
                    </Wrapper>
                    조회된 매물이 없습니다.
                  </Wrapper>
                ) : (
                  productDatum.map((data) => {
                    return (
                      <Wrapper key={data._id} width={`auto`}>
                        <Product
                          // onClick={(e) =>
                          //   imageViewerHandler(
                          //     e,
                          //     data.detailImagePaths,
                          //     `/product-detail/${data._id}`
                          //   )
                          // }
                          onClick={
                            () => setCurrentId(data._id)
                            // _moveLinkHandler(`/product-detail/${data._id}`)
                          }
                        >
                          <ThumbnailSlider
                            isImageLoading={isImageLoading}
                            datum={data.detailImagePaths.slice(0, 8)}
                          />

                          <Wrapper
                            dr={`row`}
                            height={width < 700 ? `auto` : `50px`}
                            padding={width < 700 && `5px`}
                            bgColor={`#363636`}
                            color={`#fff`}
                            isAbsolute={true}
                            bottom={`0`}
                            left={`0`}
                          >
                            <Text color={`#fff`} padding={`0px 5px`}>
                              {data.viewAddress}
                            </Text>
                            |
                            <Text
                              display={width < 700 ? `none` : `block`}
                              color={`#F2C321`}
                              padding={`0px 5px`}
                            >
                              실{areaCalculation2(data.contractArea)}평
                            </Text>
                            |
                            <Text color={`#fff`} padding={`0px 5px`}>
                              {data.isMonthly
                                ? `[월] ${data.monthlyDeposit}${data.monthlyDepositUnit}/${data.monthlyPrice}${data.monthlyPriceUnit}`
                                : data.isJeonse
                                ? `[전] ${data.jeonseDeposit}${data.jeonseDepositUnit}`
                                : `[매] ${data.tradingPrice}${data.tradingPriceUnit}`}
                            </Text>
                          </Wrapper>

                          <ProductDesc>
                            <AiFillPlusCircle />
                          </ProductDesc>

                          {data.isComplete && (
                            <SoldOut>
                              <SoldOutText>중개완료</SoldOutText>
                            </SoldOut>
                          )}

                          <Wrapper
                            isAbsolute={true}
                            right={`50px`}
                            top={`11px`}
                            width={`auto`}
                            cursor={`pointer`}
                            zIndex={`100`}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {typeof window !== `undefined` && (
                              <CopyToClipboard
                                text={`${window.location.origin}/product-detail/${data._id}`}
                                onCopy={shareProductHandler}
                              >
                                <AiOutlineShareAlt
                                  size={32}
                                  color={`#FAF7F8`}
                                />
                              </CopyToClipboard>
                            )}
                          </Wrapper>

                          {!data.isComplete && (
                            <Wrapper
                              isAbsolute={true}
                              right={`10px`}
                              top={`10px`}
                              width={`auto`}
                              cursor={`pointer`}
                              zIndex={`100`}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateProductStarHandler(data._id, data.star);
                              }}
                            >
                              {cookies.get(`INSTA_STAR_${data._id}`) ? (
                                <AiFillStar
                                  size={34}
                                  color={Theme.basicTheme_C}
                                />
                              ) : (
                                <AiOutlineStar size={34} color={`#FAF7F8`} />
                              )}
                            </Wrapper>
                          )}
                        </Product>
                        <ProductTitle
                          onClick={
                            () => setCurrentId(data._id)
                            // _moveLinkHandler(`/product-detail/${data._id}`)
                          }
                        >
                          ┖ {data.listTitle}&nbsp;
                          <SpanText color={`#999`} mediaFontSize={`14px`}>
                            | {data.listSubTitle}
                          </SpanText>
                        </ProductTitle>
                      </Wrapper>
                    );
                  })
                )
              ) : (
                <Wrapper margin={`30px 0`}>
                  <CircularIndeterminate />
                </Wrapper>
              )}

              {pages && pages.length > 0 && (
                <Wrapper margin={`40px 0 20px`}>
                  <PagenationWrapper width={`auto`}>
                    <PagenationBtn
                      onClick={() =>
                        prevAndNextPageChangeHandler(currentPage - 1)
                      }
                    >
                      <IoIosArrowBack />
                    </PagenationBtn>
                    {pages.map((data, idx) => {
                      return (
                        (currentList + 1) * 5 > idx &&
                        currentList * 5 <= idx && (
                          <Pagenation
                            className={data === currentPage ? `active` : ``}
                            key={data}
                            onClick={() => changePageHandler(data)}
                          >
                            {data + 1}
                          </Pagenation>
                        )
                      );
                    })}
                    <PagenationBtn
                      onClick={() =>
                        prevAndNextPageChangeHandler(currentPage + 1)
                      }
                    >
                      <IoIosArrowForward />
                    </PagenationBtn>
                  </PagenationWrapper>
                </Wrapper>
              )}

              {/* {isInfiniteLoading && (
                <Wrapper margin={`100px 0 0`}>
                  <CircularIndeterminate />
                </Wrapper>
              )} */}
            </Wrapper>
          </Wrapper>
        </RsWrapper>

        {currentId && (
          <Wrapper
            isFixed={true}
            top={width < 900 ? `66px` : `210px`}
            right={`0`}
            width={`auto`}
            height={width < 900 ? `calc(100vh - 66px)` : `calc(100vh - 210px)`}
            ju={`flex-start`}
            al={`flex-end`}
            bgColor={`#fff`}
            isOverflow={true}
          >
            <MM02
              currentId={currentId}
              //
              closePageHandler={closePageHandler}
            />
          </Wrapper>
        )}
      </WholeWrapper>

      <ImageViewer
        backdropCloseable
        isOpen={isViewerOpen}
        imgs={images}
        currImg={currentImage}
        onClickImg={imageViewerClickHandler}
        onClickNext={imageViewerNextHandler}
        onClickPrev={imageViewerPrevHandler}
        onClose={imageViewerHandler}
      />
    </>
  );
};

export default withResizeDetector(MM01Presenter);
