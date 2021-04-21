import React from "react";
import { withApollo } from "../../lib/apollo";
import MM81 from "../../src/Components/Routes/Client/MM81";
import ClientLayout from "../../src/Components/Routes/Layouts/ClientLayout";

const FaqBoard = () => {
  return (
    <ClientLayout title={`자주묻는 질문 | 인스타부동산`}>
      <MM81 />
    </ClientLayout>
  );
};

export default withApollo(FaqBoard);
