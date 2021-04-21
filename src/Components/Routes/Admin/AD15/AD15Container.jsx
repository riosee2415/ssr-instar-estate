import React, { useEffect, useState } from "react";
import AD15Presenter from "./AD15Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_PRODUCT_FOR_ADMIN,
  DELETE_PRODUCT,
  UPDATE_PRODUCT_VIEW,
  UPDATE_PRODUCT_MAP,
  UPDATE_PRODUCT_COMPLETE,
} from "./AD15Queries.js";
import { toast } from "react-nextjs-toast";
import storageFn from "../../../../fsStorage";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useInput from "../../../../Components/Hooks/useInput";
import useOnlyNumberInput from "../../../../Components/Hooks/useOnlyNumberInput";
import { useRouter } from "next/router";

export default ({}) => {
  ////////////// - VARIABLE- ////////////////
  const router = useRouter();

  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [viewProductDatum, setViewProductDatum] = useState(null);
  const [searchType, setSearchType] = useState("1");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchProductType, setSearchProductType] = useState("1");
  const [searchTab, setSearchTab] = useState("1");
  const [searchOrder, setSearchOrder] = useState("1");
  const [isPrivateDialogOpen, setIsPrivateDialogOpen] = useState(false);
  const [privateDialogData, setPrivateDialogData] = useState(null);

  const [tabCount01, setTabCount01] = useState(0);
  const [tabCount02, setTabCount02] = useState(0);
  const [tabCount03, setTabCount03] = useState(0);
  const [tabCount04, setTabCount04] = useState(0);

  const inputSearchType = useInput("1");
  const inputSearchKeyword1 = useInput("");
  const inputSearchKeyword2 = useOnlyNumberInput("");
  const inputSearchKeyword3 = useOnlyNumberInput("");

  ////////////// - USE QUERY- ///////////////
  const { data: productDatum, refetch: productRefetch } = useQuery(
    GET_PRODUCT_FOR_ADMIN,
    {
      variables: {
        id:
          typeof window !== `undefined`
            ? sessionStorage.getItem("DLIUQUXMSUDLQJXS")
            : `-`,
        searchType,
        searchKeyword,
        searchProductType,
        searchOrder,
      },
    }
  );

  ///////////// - USE MUTATION- /////////////
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT);
  const [updateProductViewMutation] = useMutation(UPDATE_PRODUCT_VIEW);
  const [updateProductMapMutation] = useMutation(UPDATE_PRODUCT_MAP);
  const [updateProductCompleteMutation] = useMutation(UPDATE_PRODUCT_COMPLETE);

  ///////////// - EVENT HANDLER- ////////////
  const moveLinkHandler = (link) => {
    router.push(link);
  };

  const moveURLHandler = (url) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  const changeSearchTypeHandler = (e) => {
    inputSearchType.setValue(e.target.value);
    inputSearchKeyword1.setValue("");
    inputSearchKeyword2.setValue("");
    inputSearchKeyword3.setValue("");
  };

  const searchProductHandler = () => {
    if (inputSearchType.value === "1" || inputSearchType.value === "4") {
      setSearchType(inputSearchType.value);
      setSearchKeyword(inputSearchKeyword1.value);
    } else {
      setSearchType(inputSearchType.value);
      setSearchKeyword(
        inputSearchKeyword2.value + "~" + inputSearchKeyword3.value
      );
    }
  };

  const deleteProductHandler = (id) => {
    confirmAlert({
      title: "DELETE PRODUCT",
      message: "선택하신 매물을 삭제하시겠습니까?",
      buttons: [
        {
          label: "취소",
          onClick: () => {
            return false;
          },
        },
        {
          label: "확인",
          onClick: () => deleteProductHandlerAfter(id),
        },
      ],
    });
  };

  const deleteProductHandlerAfter = async (id) => {
    const { data } = await deleteProductMutation({
      variables: {
        id,
      },
    });

    if (data.deleteProduct) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });
      productRefetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateProductViewHandler = async (id, isView) => {
    const { data } = await updateProductViewMutation({
      variables: {
        id,
        isView: !isView,
      },
    });

    if (data.updateProductView) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });
      productRefetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateProductMapHandler = async (id, isMap) => {
    const { data } = await updateProductMapMutation({
      variables: {
        id,
        isMap: !isMap,
      },
    });

    if (data.updateProductMap) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });
      productRefetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateProductCompleteHandler = async (id, isComplete) => {
    const { data } = await updateProductCompleteMutation({
      variables: {
        id,
        isComplete: !isComplete,
      },
    });

    if (data.updateProductComplete) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });
      productRefetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const togglePrivateInfoHandler = (e, data) => {
    setPrivateDialogData(data);
    setIsPrivateDialogOpen(!isPrivateDialogOpen);
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    productRefetch();
  }, []);

  useEffect(() => {}, [currentTab]);

  useEffect(() => {
    if (productDatum) {
      const tabData01 = productDatum.getProductForAdmin.filter((data) => {
        return data.status === 1;
      });

      const tabData02 = productDatum.getProductForAdmin.filter((data) => {
        return data.isView && !data.isComplete && data.status === 1;
      });

      const tabData03 = productDatum.getProductForAdmin.filter((data) => {
        return !data.isView && !data.isComplete && data.status === 1;
      });

      const tabData04 = productDatum.getProductForAdmin.filter((data) => {
        return data.isComplete && data.status === 1;
      });

      const viewProductDatum =
        searchTab === "1"
          ? tabData01
          : searchTab === "2"
          ? tabData02
          : searchTab === "3"
          ? tabData03
          : searchTab === "4"
          ? tabData04
          : [];

      setTabCount01(tabData01.length);
      setTabCount02(tabData02.length);
      setTabCount03(tabData03.length);
      setTabCount04(tabData04.length);

      setViewProductDatum(viewProductDatum);
    }
  }, [productDatum, searchTab]);

  return (
    <AD15Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      searchType={searchType}
      setSearchType={setSearchType}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      searchProductType={searchProductType}
      setSearchProductType={setSearchProductType}
      searchTab={searchTab}
      setSearchTab={setSearchTab}
      searchOrder={searchOrder}
      setSearchOrder={setSearchOrder}
      privateDialogData={privateDialogData}
      isPrivateDialogOpen={isPrivateDialogOpen}
      tabCount01={tabCount01}
      tabCount02={tabCount02}
      tabCount03={tabCount03}
      tabCount04={tabCount04}
      inputSearchType={inputSearchType}
      inputSearchKeyword1={inputSearchKeyword1}
      inputSearchKeyword2={inputSearchKeyword2}
      inputSearchKeyword3={inputSearchKeyword3}
      //
      productDatum={viewProductDatum}
      //
      moveLinkHandler={moveLinkHandler}
      moveURLHandler={moveURLHandler}
      changeSearchTypeHandler={changeSearchTypeHandler}
      searchProductHandler={searchProductHandler}
      deleteProductHandler={deleteProductHandler}
      updateProductViewHandler={updateProductViewHandler}
      updateProductMapHandler={updateProductMapHandler}
      updateProductCompleteHandler={updateProductCompleteHandler}
      togglePrivateInfoHandler={togglePrivateInfoHandler}
    />
  );
};
