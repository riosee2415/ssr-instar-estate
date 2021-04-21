import React, { useState, useEffect } from "react";
import MM00Presenter from "./MM00Presenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  ADD_ACCEPT_RECORD,
  GET_MAINBANNER,
  GET_PRODUCT_BY_BEST,
  GET_PRODUCT_FOR_MAIN,
  GET_PRODUCT_TOTALPAGE_FOR_MAIN,
  GET_PRODUCT_TOTALPAGE_ONLY_CNT_FOR_MAIN,
  GET_PRODUCT_FOR_INFINITE,
  UPDATE_PRODUCT_STAR,
  GET_ALLMENUS,
} from "./MM00Queries";
import { animateScroll as scroll } from "react-scroll";
import useInput from "../../../Hooks/useInput";
import { withCookies } from "react-cookie";
import { toast } from "react-nextjs-toast";
import { areaCalculation } from "../../../../commonUtils";
import { useRouter } from "next/router";

const MM00Container = ({ cookies }) => {
  ////////////// - VARIABLE- ///////////////
  const window = typeof window !== "undefined" && window ? window : {};

  const router = useRouter();
  const limitCnt = 30;
  const initSlidesToShow = 4;

  const unitNumber = {
    "": 1,
    만: 10000,
    억: 100000000,
    조: 1000000000000,
  };

  ////////////// - USE STATE- ///////////////
  const [width, setWidth] = useState(window.innerWidth);
  const [limit, setLimit] = useState(limitCnt);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentList, setCurrentList] = useState(0);
  const [pages, setPages] = useState(null);
  const [pageSkip, setPageSkip] = useState(true);
  const [productSkip00, setProductSkip00] = useState(true);
  const [productSkip01, setProductSkip01] = useState(true);
  const [productSkip02, setProductSkip02] = useState(true);
  const [productSkip03, setProductSkip03] = useState(true);
  const [productSkip04, setProductSkip04] = useState(true);
  const [productSkip05, setProductSkip05] = useState(true);
  const [productSkip06, setProductSkip06] = useState(true);
  const [viewProductDatum00, setViewProductDatum00] = useState(null);
  const [viewProductDatum01, setViewProductDatum01] = useState(null);
  const [viewProductDatum02, setViewProductDatum02] = useState(null);
  const [viewProductDatum03, setViewProductDatum03] = useState(null);
  const [viewProductDatum04, setViewProductDatum04] = useState(null);
  const [viewProductDatum05, setViewProductDatum05] = useState(null);
  const [viewProductDatum06, setViewProductDatum06] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const inputSearch = useInput("");
  const [currentImage, setCurrentImage] = useState(0);
  const [currentPath, setCurrentPath] = useState("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(initSlidesToShow);

  const [currentId, setCurrentId] = useState("");

  const [timerList, setTimerList] = useState([]);

  // Filter
  const [isFilter, setIsFilter] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [currentFilterTab, setCurrentFilterTab] = useState(0);

  const [starList, setStarList] = useState([]);
  const [contractAreaMode, setContractAreaMode] = useState(2);

  const inputType = useInput("");
  const inputMonthText = useInput("전체");
  const inputMonthStart = useInput(0);
  const inputMonthEnd = useInput(1000);
  const inputMonthLimit = useInput(true);
  const inputDepositText = useInput("전체");
  const inputDepositStart = useInput(0);
  const inputDepositEnd = useInput(20000);
  const inputDepositLimit = useInput(true);
  const inputTradingText = useInput("전체");
  const inputTradingStart = useInput(0);
  const inputTradingEnd = useInput(300000);
  const inputTradingLimit = useInput(true);
  const inputRightFeeText = useInput("전체");
  const inputRightFeeStart = useInput(0);
  const inputRightFeeEnd = useInput(20000);
  const inputRightFeeLimit = useInput(true);
  const inputIsRightFee = useInput(false);
  const inputContractAreaText = useInput("전체");
  const inputContractAreaStart = useInput(0);
  const inputContractAreaEnd = useInput(150);
  const inputContractAreaLimit = useInput(true);
  const inputFloor = useInput("");
  const inputIsParking = useInput("");
  const inputIsElevator = useInput("");
  const inputIsCeiling = useInput(false);
  const inputBuildingUse = useInput("");
  const inputProductType = useInput("");

  ////////////// - USE QUERY- ///////////////
  const { data: menuDatum, refetch: menuRefetch } = useQuery(GET_ALLMENUS);

  const {
    data: mainBannerData,
    loading: mainBannerLoading,
    refetch: mainBannerRefetch,
  } = useQuery(GET_MAINBANNER);

  // const {
  //   data: bestProductDatum,
  //   loading: bestProductLoading,
  //   refetch: bestProductRefetch,
  // } = useQuery(GET_PRODUCT_BY_BEST);

  const { data: productDatum00, refetch: productRefetch00 } = useQuery(
    GET_PRODUCT_FOR_MAIN,
    {
      variables: {
        currentPage,
        limit,
        category: "",
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: productSkip00,
    }
  );

  const { data: tData, refetch: tRefetch } = useQuery(
    GET_PRODUCT_TOTALPAGE_FOR_MAIN,
    {
      variables: {
        limit,
        category: "",
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: pageSkip,
    }
  );

  const { data: cData, refetch: cRefetch } = useQuery(
    GET_PRODUCT_TOTALPAGE_ONLY_CNT_FOR_MAIN,
    {
      variables: {
        category: "",
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: productSkip00,
    }
  );

  const { data: productDatum01, refetch: productRefetch01 } = useQuery(
    GET_PRODUCT_FOR_MAIN,
    {
      variables: {
        currentPage,
        limit,
        category: "홍대사무실 테마별",
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: productSkip01,
    }
  );

  const { data: productDatum02, refetch: productRefetch02 } = useQuery(
    GET_PRODUCT_FOR_MAIN,
    {
      variables: {
        currentPage,
        limit,
        category: "홍대상가 테마별",
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: productSkip02,
    }
  );

  const { data: productDatum03, refetch: productRefetch03 } = useQuery(
    GET_PRODUCT_FOR_MAIN,
    {
      variables: {
        currentPage,
        limit,
        category: "홍대사무실 실평형",
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: productSkip03,
    }
  );

  const { data: productDatum04, refetch: productRefetch04 } = useQuery(
    GET_PRODUCT_FOR_MAIN,
    {
      variables: {
        currentPage,
        limit,
        category: "홍대상가 실평형",
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: productSkip04,
    }
  );

  const { data: productDatum05, refetch: productRefetch05 } = useQuery(
    GET_PRODUCT_FOR_MAIN,
    {
      variables: {
        currentPage,
        limit,
        category: "홍대Home/ 주택",
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: productSkip05,
    }
  );

  const { data: productDatum06, refetch: productRefetch06 } = useQuery(
    GET_PRODUCT_FOR_MAIN,
    {
      variables: {
        currentPage,
        limit,
        category: "홍대매매 정보",
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: productSkip06,
    }
  );

  ///////////// - USE MUTATION- /////////////
  const [addAcceptRecordMutation] = useMutation(ADD_ACCEPT_RECORD);
  const [updateProductStarMutation] = useMutation(UPDATE_PRODUCT_STAR);

  ///////////// - EVENT HANDLER- ////////////
  const priceUnitToKorean = (number) => {
    const inputNumber = number < 0 ? false : number;
    const unitWords = ["", "만", "억", "조", "경"];
    const splitUnit = 10000;
    const splitCount = unitWords.length;
    const resultArray = [];
    let resultString = "";

    for (let i = 0; i < splitCount; i++) {
      let unitResult =
        (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
      unitResult = Math.floor(unitResult);
      if (unitResult > 0) {
        resultArray[i] = unitResult;
      }
    }

    for (let i = 0; i < resultArray.length; i++) {
      if (!resultArray[i]) continue;
      resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }

    return resultString;
  };

  const imageViewerHandler = (e, images, path) => {
    let image = [];

    images &&
      images.map((data, idx) => {
        image.push({
          src: data,
        });
      });

    if (!isViewerOpen) {
      setImages(image);
      setCurrentPath(path);
    } else {
      setCurrentImage(0);
      setImages([]);
      setCurrentPath("");
    }

    setIsViewerOpen(!isViewerOpen);
  };

  const imageViewerPrevHandler = () => {
    setCurrentImage(currentImage - 1);
  };

  const imageViewerNextHandler = () => {
    setCurrentImage(currentImage + 1);
  };

  const imageViewerGotoHandler = (index) => {
    setCurrentImage(index);
  };

  const imageViewerClickHandler = () => {
    router.push(currentPath);
  };

  const searchProductHandler = () => {
    router.push(`/search/?search=${inputSearch.value}`);
  };

  const _moveLinkHandler = (link) => {
    router.push(link);
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

  const closePageHandler = () => {
    setCurrentId("");
  };

  const _addAceeptRecord = async () => {
    if (typeof window === `undefined`) return;

    const d = new Date();
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    month = ("00" + month).slice(-2);
    date = ("00" + date).slice(-2);

    const regDate = year + month + date;

    const {
      data: { addAcceptRecord },
    } = await addAcceptRecordMutation({
      variables: {
        date: regDate,
      },
    });

    await sessionStorage.setItem("ALKJSDLJOQIUALSX", "LAZKNJXOIUQASDSA");
  };

  const changeFilterTabHandler = async (value) => {
    if (value === 0) {
      inputIsCeiling.setValue(false);
      inputBuildingUse.setValue("");
      inputProductType.setValue("");
    } else if (value === 1) {
      inputRightFeeText.setValue("전체");
      inputRightFeeStart.setValue(0);
      inputRightFeeEnd.setValue(20000);
      inputRightFeeLimit.setValue(true);
      inputIsRightFee.setValue(false);
      inputProductType.setValue("");
    } else if (value === 2) {
      inputType.setValue("");
      inputRightFeeText.setValue("전체");
      inputRightFeeStart.setValue(0);
      inputRightFeeEnd.setValue(20000);
      inputRightFeeLimit.setValue(true);
      inputIsRightFee.setValue(false);
      inputFloor.setValue("");
      inputIsCeiling.setValue(false);
      inputBuildingUse.setValue("");
    } else if (value === 3) {
      const starList = [];

      await Promise.all(
        Object.keys(cookies.cookies).map((key) => {
          if (key.includes("INSTA_STAR")) {
            starList.push(key.replace("INSTA_STAR_", ""));
          }
        })
      );
      setStarList(starList);
    }

    setCurrentFilterTab(value);
  };

  const changeValueHandler = (inputObj, value) => {
    inputObj.setValue(value);
  };

  const changeSliderHandler = (
    type,
    inputText,
    inputStart,
    inputEnd,
    inputLimit,
    setInputLimit,
    newValue,
    maxValue
  ) => {
    inputStart.setValue(newValue[0]);
    inputEnd.setValue(newValue[1]);

    let startText = "";
    let endText = "";

    if (type === "전용면적") {
      if (newValue[0] === 0 && newValue[1] === maxValue && inputLimit) {
        inputText.setValue("전체");
      } else {
        if (newValue[0] === 0) {
          startText = "최소";
        } else {
          startText = `${areaCalculation(newValue[0], 0)}㎡ (${newValue[0]}평)`;
        }

        if (newValue[1] === maxValue && inputLimit) {
          endText = "최대";
        } else {
          if (newValue[1] !== maxValue) setInputLimit(false);

          endText = `${areaCalculation(newValue[1], 0)}㎡ (${newValue[1]}평)`;
        }

        inputText.setValue(startText + " ~ " + endText);
      }
    } else {
      if (newValue[0] === 0 && newValue[1] === maxValue && inputLimit) {
        inputText.setValue("전체");
      } else {
        if (newValue[0] === 0) {
          startText = "최소";
        } else {
          startText = priceUnitToKorean(newValue[0] * unitNumber["만"]);
        }

        if (newValue[1] === maxValue && inputLimit) {
          endText = "최대";
        } else {
          if (newValue[1] !== maxValue) setInputLimit(false);

          endText = priceUnitToKorean(newValue[1] * unitNumber["만"]);
        }

        inputText.setValue(startText + " ~ " + endText);
      }
    }
  };

  const changeCommitSliderHandler = () => {};

  const startFilterHandler = () => {
    setIsLoading(true);
    setIsImageLoading(false);
    setIsFilter(true);
    setProductSkip00(false);
    setPageSkip(false);
  };

  const resetFilterHandler = () => {
    setIsLoading(true);
    setIsImageLoading(false);

    setCurrentFilterTab(0);

    inputType.setValue("");
    inputMonthText.setValue("전체");
    inputMonthStart.setValue(0);
    inputMonthEnd.setValue(1000);
    inputDepositText.setValue("전체");
    inputDepositStart.setValue(0);
    inputDepositEnd.setValue(20000);
    inputTradingText.setValue("전체");
    inputTradingStart.setValue(0);
    inputTradingEnd.setValue(300000);
    inputRightFeeText.setValue("전체");
    inputRightFeeStart.setValue(0);
    inputRightFeeEnd.setValue(20000);
    inputIsRightFee.setValue(false);
    inputContractAreaText.setValue("전체");
    inputContractAreaStart.setValue(0);
    inputContractAreaEnd.setValue(150);
    inputFloor.setValue("");
    inputIsParking.setValue("");
    inputIsElevator.setValue("");
    inputIsCeiling.setValue(false);
    inputBuildingUse.setValue("");
    inputProductType.setValue("");

    const cookiesKey = Object.keys(cookies.cookies);

    cookiesKey.map((data, idx) => {
      if (data.includes("INSTAR_STAR")) {
        cookies.remove(data);
      }
    });

    setIsFilter(false);
    const timer1 = setTimeout(() => {
      setProductSkip01(false);
    }, 500);

    const timer2 = setTimeout(() => {
      setProductSkip02(false);
    }, 1000);

    const timer3 = setTimeout(() => {
      setProductSkip03(false);
    }, 1500);

    const timer4 = setTimeout(() => {
      setProductSkip04(false);
    }, 2000);

    const timer5 = setTimeout(() => {
      setProductSkip05(false);
    }, 2500);

    const timer6 = setTimeout(() => {
      setProductSkip06(false);
    }, 3000);

    const timer7 = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    timerList.push(timer1);
    timerList.push(timer2);
    timerList.push(timer3);
    timerList.push(timer4);
    timerList.push(timer5);
    timerList.push(timer6);
    timerList.push(timer7);
  };

  const prevAndNextPageChangeHandler = (page) => {
    let list = currentList;

    if (page < 0) {
      toast.notify("첫 페이지 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (page > pages.length - 1) {
      toast.notify("마지막 페이지 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if ((currentList + 1) * 5 === page) {
      list += 1;
    } else if (currentList * 5 - 1 === page) {
      list -= 1;
    }
    setIsLoading(true);
    setCurrentList(list);
    setCurrentPage(page);

    const timer = setTimeout(() => {
      setProductSkip00(false);
    }, 1);

    timerList.push(timer);
  };

  const changePageHandler = (page) => {
    setCurrentPage(page);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setProductSkip00(false);
    }, 1);

    timerList.push(timer);
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    if (typeof window === `undefined`) return;

    const item = sessionStorage.getItem("ALKJSDLJOQIUALSX");

    if (item !== "LAZKNJXOIUQASDSA") {
      _addAceeptRecord();
    }

    scroll.scrollTo(0);

    const timer1 = setTimeout(() => {
      setProductSkip01(false);
      productRefetch01();
    }, 500);

    const timer2 = setTimeout(() => {
      setProductSkip02(false);
      productRefetch02();
    }, 1500);

    const timer3 = setTimeout(() => {
      setProductSkip03(false);
      productRefetch03();
    }, 2500);

    const timer4 = setTimeout(() => {
      setProductSkip04(false);
      productRefetch04();
    }, 3500);

    const timer5 = setTimeout(() => {
      setProductSkip05(false);
      productRefetch05();
    }, 4500);

    const timer6 = setTimeout(() => {
      setProductSkip06(false);
      productRefetch06();
    }, 5500);

    timerList.push(timer1);
    timerList.push(timer2);
    timerList.push(timer3);
    timerList.push(timer4);
    timerList.push(timer5);
    timerList.push(timer6);

    menuRefetch();
    mainBannerRefetch();

    return () => {
      timerList.map((data) => {
        clearTimeout(data);
      });
    };
  }, []);

  useEffect(() => {
    if (width) {
      let slidesToShow;

      if (width < 800) {
        slidesToShow = 1;
      } else if (width < 1000) {
        slidesToShow = 2;
      } else if (width < 1350) {
        slidesToShow = 3;
      } else {
        slidesToShow = initSlidesToShow;
      }

      setSlidesToShow(slidesToShow);
    }
  }, [width]);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window.innerWidth]);

  useEffect(() => {
    if (productDatum00) {
      productRefetch00();
      tRefetch();
      cRefetch();

      const timer1 = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      setViewProductDatum00(productDatum00.getProductForMain);
      setProductSkip00(true);

      const timer2 = setTimeout(() => {
        setIsImageLoading(true);
      }, 3000);

      timerList.push(timer1);
      timerList.push(timer2);
    }
  }, [productDatum00]);

  useEffect(() => {
    if (tData) {
      const temp = [];

      for (let i = 0; i < tData.getProductTotalPageForMain; i++) temp.push(i);

      setPages(temp);
      setPageSkip(true);
    }
  }, [tData]);

  useEffect(() => {
    if (productDatum01) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      timerList.push(timer);

      setViewProductDatum01(productDatum01.getProductForMain);
      setProductSkip01(true);
    }
  }, [productDatum01]);

  useEffect(() => {
    if (productDatum02) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      timerList.push(timer);

      setViewProductDatum02(productDatum02.getProductForMain);
      setProductSkip02(true);
    }
  }, [productDatum02]);

  useEffect(() => {
    if (productDatum03) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      timerList.push(timer);

      setViewProductDatum03(productDatum03.getProductForMain);
      setProductSkip03(true);
    }
  }, [productDatum03]);

  useEffect(() => {
    if (productDatum04) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      timerList.push(timer);

      setViewProductDatum04(productDatum04.getProductForMain);
      setProductSkip04(true);
    }
  }, [productDatum04]);

  useEffect(() => {
    if (productDatum05) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      timerList.push(timer);

      setViewProductDatum05(productDatum05.getProductForMain);
      setProductSkip05(true);
    }
  }, [productDatum05]);

  useEffect(() => {
    if (productDatum06) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      timerList.push(timer);

      setViewProductDatum06(productDatum06.getProductForMain);
      setProductSkip06(true);
    }
  }, [productDatum06]);

  useEffect(() => {
    if (
      viewProductDatum01 &&
      viewProductDatum02 &&
      viewProductDatum03 &&
      viewProductDatum04 &&
      viewProductDatum05 &&
      viewProductDatum06
    ) {
      const timer = setTimeout(() => {
        setIsImageLoading(true);
      }, 3000);

      timerList.push(timer);
    }
  }, [
    viewProductDatum01,
    viewProductDatum02,
    viewProductDatum03,
    viewProductDatum04,
    viewProductDatum05,
    viewProductDatum06,
  ]);

  // useEffect(() => {
  //   if (menuDatum && productDatum) {
  //     const menu = menuDatum.getHeaderMenus.filter((data) => {
  //       return data.isProduct;
  //     });

  //     const array = [];

  //     menu.map(async (data) => {
  //       array.push({
  //         name: data.name,
  //         list: productDatum.getProduct.filter(async (productData) => {
  //           if (!productData.categoryList[0]) return false;

  //           const resultList = productData.categoryList.filter(
  //             (categoryData) => {
  //               if (categoryData.parentMenu.name === "홍대사무실 테마별") {
  //                 return (
  //                   categoryData.name === "甲인테리어 사무실" &&
  //                   categoryData.parentMenu._id === data._id
  //                 );
  //               } else if (categoryData.parentMenu.name === "홍대상가 테마별") {
  //                 return (
  //                   categoryData.name === "甲인테리어 상가" &&
  //                   categoryData.parentMenu._id === data._id
  //                 );
  //               } else {
  //                 return categoryData.parentMenu._id === data._id;
  //               }
  //             }
  //           );

  //           let flag = true;

  //           await Promise.all(
  //             array.map((data2) => {
  //               data2.list.filter((data3) => {
  //                 console.log(data3);
  //               });
  //             })
  //           );

  //           return resultList.length > 0 && flag;
  //         }),
  //       });
  //     });
  //     array.map((data, idx) => {
  //       array[idx].list = data.list.slice(0, 20);
  //     });

  //     setViewProductDatum(array);
  //   } else {
  //     menuRefetch();
  //     productRefetch();
  //   }
  // }, [menuDatum, productDatum]);

  return (
    <>
      {/* <MM00Search /> */}
      <MM00Presenter
        cookies={cookies}
        //
        width={width}
        currentList={currentList}
        currentPage={currentPage}
        pages={pages}
        limit={limit}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isImageLoading={isImageLoading}
        inputSearch={inputSearch}
        currentImage={currentImage}
        isViewerOpen={isViewerOpen}
        images={images}
        slidesToShow={slidesToShow}
        currentId={currentId}
        setCurrentId={setCurrentId}
        isFilter={isFilter}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        currentFilterTab={currentFilterTab}
        setCurrentFilterTab={setCurrentFilterTab}
        contractAreaMode={contractAreaMode}
        setContractAreaMode={setContractAreaMode}
        inputType={inputType}
        inputMonthText={inputMonthText}
        inputMonthStart={inputMonthStart}
        inputMonthEnd={inputMonthEnd}
        inputMonthLimit={inputMonthLimit}
        inputDepositText={inputDepositText}
        inputDepositStart={inputDepositStart}
        inputDepositEnd={inputDepositEnd}
        inputDepositLimit={inputDepositLimit}
        inputTradingText={inputTradingText}
        inputTradingStart={inputTradingStart}
        inputTradingEnd={inputTradingEnd}
        inputTradingLimit={inputTradingLimit}
        inputRightFeeText={inputRightFeeText}
        inputRightFeeStart={inputRightFeeStart}
        inputRightFeeEnd={inputRightFeeEnd}
        inputRightFeeLimit={inputRightFeeLimit}
        inputIsRightFee={inputIsRightFee}
        inputContractAreaText={inputContractAreaText}
        inputContractAreaStart={inputContractAreaStart}
        inputContractAreaEnd={inputContractAreaEnd}
        inputContractAreaLimit={inputContractAreaLimit}
        inputFloor={inputFloor}
        inputIsParking={inputIsParking}
        inputIsElevator={inputIsElevator}
        inputIsCeiling={inputIsCeiling}
        inputBuildingUse={inputBuildingUse}
        inputProductType={inputProductType}
        //
        mainBannerData={mainBannerData && mainBannerData.getMainBanner}
        // bestProductDatum={bestProductDatum && bestProductDatum.getProductByBest}
        productDatum00={viewProductDatum00}
        productDatum01={viewProductDatum01}
        productDatum02={viewProductDatum02}
        productDatum03={viewProductDatum03}
        productDatum04={viewProductDatum04}
        productDatum05={viewProductDatum05}
        productDatum06={viewProductDatum06}
        //
        _moveLinkHandler={_moveLinkHandler}
        searchProductHandler={searchProductHandler}
        imageViewerHandler={imageViewerHandler}
        imageViewerPrevHandler={imageViewerPrevHandler}
        imageViewerNextHandler={imageViewerNextHandler}
        imageViewerGotoHandler={imageViewerGotoHandler}
        imageViewerClickHandler={imageViewerClickHandler}
        updateProductStarHandler={updateProductStarHandler}
        shareProductHandler={shareProductHandler}
        closePageHandler={closePageHandler}
        changeFilterTabHandler={changeFilterTabHandler}
        changeValueHandler={changeValueHandler}
        changeSliderHandler={changeSliderHandler}
        changeCommitSliderHandler={changeCommitSliderHandler}
        startFilterHandler={startFilterHandler}
        resetFilterHandler={resetFilterHandler}
        prevAndNextPageChangeHandler={prevAndNextPageChangeHandler}
        changePageHandler={changePageHandler}
      />
    </>
  );
};

export default withCookies(MM00Container);
