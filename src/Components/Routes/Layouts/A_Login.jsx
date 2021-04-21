import React, { useState } from "react";
import {
  WholeWrapper,
  Wrapper,
  TextInput,
  CommonButton,
} from "../../AdminCommonComponents";
import { GET_ADMIN_USER_LOGIN_RESULT } from "./A_LayoutQueries";
import useInput from "../../../Components/Hooks/useInput";
import { useQuery } from "@apollo/react-hooks";
import { toast } from "react-nextjs-toast";
import { useRouter } from "next/router";

const A_Login = () => {
  ////////////// - VARIABLES - ///////////////
  const router = useRouter();

  ////////////// - USE STATE - ///////////////
  const [isLogin, setIsLogin] = useState(false);
  const [loginSkip, setLoginSkip] = useState(true);
  const [isLoginProcess, setIsLoginProcess] = useState(false);
  const inputUserId = useInput("");
  const inputPassword = useInput("");

  ////////////// - USE QUERY - ///////////////
  const {
    data: loginResult,
    loading: loginLoading,
    refetch: loginRefetch,
  } = useQuery(GET_ADMIN_USER_LOGIN_RESULT, {
    variables: {
      userId: inputUserId.value,
      password: inputPassword.value,
    },
    skip: loginSkip,
  });

  if (!loginLoading && isLoginProcess) {
    if (
      typeof window !== `undefined` &&
      loginResult &&
      loginResult.getAdminUserLoginResult
    ) {
      setIsLogin(true);

      sessionStorage.setItem(
        "DLIUQUXMSUDLQJXS",
        loginResult.getAdminUserLoginResult._id
      );

      sessionStorage.setItem(
        "XLJHALKJQLIUXMXA",
        loginResult.getAdminUserLoginResult.right
      );

      toast.notify("로그인에 성공했습니다.", {
        duration: 5,
        type: "success",
      });

      router.push(`/admin/main`);
    } else {
      toast.notify("로그인에 실패했습니다.", {
        duration: 5,
        type: "error",
      });
    }
    setIsLoginProcess(false);
  }

  ////////////// - EVENT HANDLER - ///////////////
  const _loginUserHanlder = async () => {
    if (!inputUserId.value || inputUserId.value.trim() === "") {
      toast.notify("아이디를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputPassword.value || inputUserId.value.trim() === "") {
      toast.notify("비밀번호를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    await setLoginSkip(false);
    setIsLoginProcess(true);
  };

  return (
    <WholeWrapper height={`100%`} bgColor={`linear-gradient(#000,#ffcc15)`}>
      <Wrapper
        width={`500px`}
        height={`400px`}
        bgColor={`rgba(0, 0, 0, 0.6)`}
        color={`#fff`}
        isBorder={true}
        shadow={`0px 5px 10px #999`}
      >
        <Wrapper dr={`row`} margin={`15px 0`}>
          <Wrapper width={`100px`} color={`#fff`} al={`flex-start`}>
            아이디
          </Wrapper>
          <TextInput
            width={`250px`}
            className="login__input"
            type="text"
            {...inputUserId}
            onKeyDown={(e) => e.keyCode === 13 && _loginUserHanlder()}
          />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Wrapper width={`100px`} color={`#fff`} al={`flex-start`}>
            비밀번호
          </Wrapper>
          <TextInput
            width={`250px`}
            className="login__input"
            type="password"
            {...inputPassword}
            onKeyDown={(e) => e.keyCode === 13 && _loginUserHanlder()}
          />
        </Wrapper>
        <CommonButton
          width={`300px`}
          margin={`50px 0px 0px`}
          className="login__btn"
          onClick={_loginUserHanlder}
        >
          로그인
        </CommonButton>
      </Wrapper>
    </WholeWrapper>
  );
};

export default A_Login;
