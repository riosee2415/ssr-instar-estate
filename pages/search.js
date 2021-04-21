import React from "react";
import { withApollo } from "../lib/apollo";
import MM05 from "../src/Components/Routes/Client/MM05";
import ClientLayout from "../src/Components/Routes/Layouts/ClientLayout";

const Search = () => {
  return (
    <ClientLayout title={`검색 | 인스타부동산`}>
      <MM05 />
    </ClientLayout>
  );
};

export default withApollo(Search);
