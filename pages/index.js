import React from "react";
import { withApollo } from "../lib/apollo";
import MM00 from "../src/Components/Routes/Client/MM00";
import ClientLayout from "../src/Components/Routes/Layouts/ClientLayout";

const Main = (props) => {
  return (
    <ClientLayout title={`메인 | 인스타부동산`}>
      <MM00 />
    </ClientLayout>
  );
};

export default withApollo(Main);
