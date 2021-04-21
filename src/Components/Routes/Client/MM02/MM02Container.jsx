import React, { useEffect, useState, forwardRef, useRef } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import MM02Presenter from "./MM02Presenter";
import {
  GET_PRODUCTDETAIL,
  GET_ESTATE,
  UPDATE_PRODUCT_HIT,
  UPDATE_PRODUCT_STAR,
} from "./MM02Queries";
import { withCookies } from "react-cookie";
import { toast } from "react-nextjs-toast";
import { useRouter } from "next/router";

const MM02Container = ({
  cookies,
  //
  currentId,
  //
  closePageHandler,
}) => {
  ////////////// - VARIABLES- ///////////////
  const router = useRouter();
  const query = router.query;

  ////////////// - USE REF- ///////////////
  const additionalContentRef = useRef();
  const contentRef = useRef();
  const mapRef = forwardRef();

  ////////////// - USE STATE- ///////////////
  const [isChange1, setIsChange1] = useState(false);
  const [isChange2, setIsChange2] = useState(false);

  const [isImageView, setIsImageView] = useState(false);

  const [timerList, setTimerList] = useState([]);

  ////////////// - USE QUERY- ///////////////
  const { data: productData, refetch: productRefetch } = useQuery(
    GET_PRODUCTDETAIL,
    {
      variables: {
        id: currentId || query[":key"],
      },
    }
  );

  const {
    data: estateData,
    loading: estateLoading,
    refetch: estateRefetch,
  } = useQuery(GET_ESTATE);

  ///////////// - USE MUTATION- /////////////
  const [updateProductHitMutation] = useMutation(UPDATE_PRODUCT_HIT);
  const [updateProductStarMutation] = useMutation(UPDATE_PRODUCT_STAR);

  ///////////// - EVENT HANDLER- ////////////
  const updateProductHitHandler = async () => {
    const { data } = await updateProductHitMutation({
      variables: {
        id: productData.getProductDetail._id,
        hit: productData.getProductDetail.hit + 1,
      },
    });
  };

  const updateProductStarHandler = async (id, star) => {
    let value = 0;

    if (cookies.get(`INSTA_STAR_${id}`)) {
      cookies.remove(`INSTA_STAR_${id}`);

      value = -1;
    } else {
      cookies.set(`INSTA_STAR_${id}`, `1`, {
        path: "/",
        maxAge: 3600 * 24 * 7,
      });

      value = 1;
    }

    const { data } = await updateProductStarMutation({
      variables: {
        id,
        star: star + value,
      },
    });
  };

  const shareProductHandler = (text, result) => {
    if (result) {
      toast.notify("클립보드로 URL이 복사되었습니다.", {
        duration: 5,
        type: "success",
      });
    }
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    productRefetch();
    estateRefetch();

    return () => {
      timerList.map((data) => {
        clearTimeout(data);
      });
    };
  }, []);

  useEffect(() => {
    if (productData) {
      const timer = setTimeout(() => {
        if (productData.getProductDetail.additionalContent)
          additionalContentRef.current.innerHTML =
            productData.getProductDetail.additionalContent;

        if (productData.getProductDetail.content)
          contentRef.current.innerHTML = productData.getProductDetail.content;

        timerList.push(timer);

        updateProductHitHandler();
      }, 100);
    }
  }, [productData]);

  return (
    <MM02Presenter
      router={router}
      cookies={cookies}
      //
      additionalContentRef={additionalContentRef}
      contentRef={contentRef}
      mapRef={mapRef}
      //
      isChange1={isChange1}
      isChange2={isChange2}
      setIsChange1={setIsChange1}
      setIsChange2={setIsChange2}
      currentId={currentId}
      isImageView={isImageView}
      setIsImageView={setIsImageView}
      //
      productData={productData && productData.getProductDetail}
      estateData={estateData && estateData.getEstate}
      //
      closePageHandler={closePageHandler}
      updateProductStarHandler={updateProductStarHandler}
      shareProductHandler={shareProductHandler}
    />
  );
};

export default withCookies(MM02Container);
