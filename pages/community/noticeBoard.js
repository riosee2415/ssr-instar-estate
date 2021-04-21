import React from "react";
import { withApollo } from "../../lib/apollo";
import MM80 from "../../src/Components/Routes/Client/MM80";
import ClientLayout from "../../src/Components/Routes/Layouts/ClientLayout";

const NoticeBoard = () => {
  return (
    <ClientLayout title={`공지사항 | 인스타부동산`}>
      <MM80 />
    </ClientLayout>
  );
};

export default withApollo(NoticeBoard);
