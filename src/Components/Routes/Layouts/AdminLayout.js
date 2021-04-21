import React, { useState } from "react";
import {
  WholeWrapper,
  Wrapper,
} from "../../../Components/AdminCommonComponents";
import Head from "next/head";
import { withApollo } from "../../../../lib/apollo";
import A_Header from "./A_Header";
import A_Side from "./A_Side";
import Theme from "../../../Styles/Theme";

const AdminLayout = ({ children, title, isSide = true }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      <A_Header />

      <WholeWrapper
        height={`calc(100vh - 40px)`}
        al={`flex-start`}
        ju={`flex-start`}
        dr={`row`}
      >
        {isSide && (
          <Wrapper
            width={`200px`}
            minWidth={`200px`}
            al={`center`}
            ju={`flex-start`}
            height={`100%`}
            bgColor={Theme.black_C}
          >
            <A_Side />
          </Wrapper>
        )}

        <Wrapper
          al={`flex-start`}
          ju={`flex-start`}
          height={`100%`}
          padding={isSide ? `20px` : `0`}
          isScroll={true}
        >
          {children}
        </Wrapper>
      </WholeWrapper>
    </React.Fragment>
  );
};

export default withApollo(AdminLayout);
