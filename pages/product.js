import React from "react";
import { withApollo } from "../lib/apollo";
import MM01 from "../src/Components/Routes/Client/MM01";
import ClientLayout from "../src/Components/Routes/Layouts/ClientLayout";

const Main = () => {
  return (
    <ClientLayout>
      <MM01 />
    </ClientLayout>
  );
};

export default withApollo(Main);
