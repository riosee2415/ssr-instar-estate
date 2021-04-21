import React from "react";
import { withApollo } from "../../../lib/apollo";
import EventBoard from "../../../src/Components/eventBoard/Board_D";
import ClientLayout from "../../../src/Components/Routes/Layouts/ClientLayout";

const EventBoardDetail = () => {
  return (
    <ClientLayout title={`이벤트 | 인스타부동산`}>
      <EventBoard />
    </ClientLayout>
  );
};

export default withApollo(EventBoardDetail);
