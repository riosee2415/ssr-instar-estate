import React from "react";
import { withApollo } from "../../../lib/apollo";
import NoticeBoard from "../../../src/Components/noticeBoard/Board_D";
import ClientLayout from "../../../src/Components/Routes/Layouts/ClientLayout";

const NoticeBoardDetail = () => {
  return (
    <ClientLayout title={`공지사항 | 인스타부동산`}>
      <NoticeBoard />
    </ClientLayout>
  );
};

export default withApollo(NoticeBoardDetail);
