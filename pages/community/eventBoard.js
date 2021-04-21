import React from "react";
import { withApollo } from "../../lib/apollo";
import MM82 from "../../src/Components/Routes/Client/MM82";
import ClientLayout from "../../src/Components/Routes/Layouts/ClientLayout";

const EventBoard = () => {
  return (
    <ClientLayout title={`이벤트 | 인스타부동산`}>
      <MM82 />
    </ClientLayout>
  );
};

export default withApollo(EventBoard);
