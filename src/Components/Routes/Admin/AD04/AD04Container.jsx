import React, { useEffect, useState } from "react";
import AD04Presenter from "./AD04Presenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { toast } from "react-nextjs-toast";
import { GET_POPUP, MODIFY_POPUP, MODIFY_POPUP_STATUS } from "./AD04Queries.js";
import storageFn from "../../../../fsStorage";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  ////////////// - VARIABLE- ////////////////

  ////////////// - USE QUERY- ///////////////
  const { data: popupDatum, loading, refetch } = useQuery(GET_POPUP);

  ///////////// - USE MUTATION- /////////////
  const [modifyPopupMutation] = useMutation(MODIFY_POPUP);
  const [modifyPopupStatusMutation] = useMutation(MODIFY_POPUP_STATUS);

  ///////////// - EVENT HANDLER- ////////////
  const fileChangeHandler = async (e) => {
    setIsLoading(true);
    const path = await storageFn.uploadFile(
      "INSTA-ESTATE/uploads/popups",
      e.target.files[0].name,
      e.target.files[0]
    );

    const db_path = await storageFn.getSotragePath(path);

    const { data } = await modifyPopupMutation({
      variables: {
        id: popupDatum && popupDatum.getPopup[currentTab]._id,
        imagePath: db_path,
      },
    });

    if (data && data.modifyPopup) {
      toast.notify("POPUP UPDATE!", {
        duration: 5,
        type: "info",
      });
      refetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }

    setIsLoading(false);
  };

  const modifyPopupStatus = async () => {
    const { data } = await modifyPopupStatusMutation({
      variables: {
        id: popupDatum && popupDatum.getPopup[currentTab]._id,
        status: popupDatum && popupDatum.getPopup[currentTab].useYn,
      },
    });

    if (data && data.modifyPopupStatus) {
      toast.notify("POPUP UPDATE!", {
        duration: 5,
        type: "info",
      });
      refetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    refetch();
  }, []);

  return (
    <AD04Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      //
      popupDatum={popupDatum && popupDatum.getPopup}
      //
      fileChangeHandler={fileChangeHandler}
      modifyPopupStatus={modifyPopupStatus}
    />
  );
};
