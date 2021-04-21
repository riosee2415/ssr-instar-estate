import React from "react";
import { withApollo } from "../../lib/apollo";
import MM04 from "../../src/Components/Routes/Client/MM04";
import ClientLayout from "../../src/Components/Routes/Layouts/ClientLayout";

const Location = () => {
  return (
    <ClientLayout title={`부동산위치 | 인스타부동산`}>
      <MM04 />
    </ClientLayout>
  );
};

export default withApollo(Location);
