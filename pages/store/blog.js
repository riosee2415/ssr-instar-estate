import React from "react";
import { withApollo } from "../../lib/apollo";
import MM03 from "../../src/Components/Routes/Client/MM03";
import ClientLayout from "../../src/Components/Routes/Layouts/ClientLayout";

const Blog = () => {
  return (
    <ClientLayout title={`BLOG | 인스타부동산`}>
      <MM03 />
    </ClientLayout>
  );
};

export default withApollo(Blog);
