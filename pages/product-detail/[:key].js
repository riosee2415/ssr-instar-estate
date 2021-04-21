import React from "react";
import { withApollo } from "../../lib/apollo";
import MM02 from "../../src/Components/Routes/Client/MM02";
import ClientLayout from "../../src/Components/Routes/Layouts/ClientLayout";

const ProductDetail = () => {
  return (
    <ClientLayout>
      <MM02 />
    </ClientLayout>
  );
};

export default withApollo(ProductDetail);
