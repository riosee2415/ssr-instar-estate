import React from "react";
import { withApollo } from "../../lib/apollo";
import MM90 from "../../src/Components/Routes/Client/MM90";
import ClientLayout from "../../src/Components/Routes/Layouts/ClientLayout";

const JoinUs = () => {
  return (
    <ClientLayout title={`회원가입 | 인스타부동산`}>
      <MM90 />
    </ClientLayout>
  );
};

export default withApollo(JoinUs);
