import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/userActions";
import { useNavigate, useLocation } from "react-router-dom";

export default function Auth(SpecificComponent, option, adminRoute = null) {
  //  --- Auth option ---
  //   1. null : 아무나 출입 가능
  //   2. true : 로그인 한 유저만 출입 가능
  //   3. false : 로그인 한 유저는 출입 불가

  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();

    console.log("location", location);

    // useEffect(() => {
    dispatch(userActions.auth()).then((res) => {
      console.log("res test:::", res);
      if (!res.isAuth) {
        // if (
        //   res.err.name === "TokenExpiredError"
        //   // &&
        //   // option &&
        //   // location.pathname !== "/login"
        // ) {
        //   // navigate("/login", {
        //   //   replace: true,
        //   //   state: { originalPath: location },
        //   // });
        //   dispatch({ type: "TOKEN_EXPIRED" });
        //   window.alert("보안을 위해 자동 로그아웃 되었습니다.");
        //   //err 초기화 해야함
        // }

        // 로그인이 안되었는데,
        if (option) {
          // 로그인한 유저만 출입 가능하다면 (option === true)
          navigate("/login", {
            replace: true,
            state: { originalPath: location },
          });
        }
      } else {
        // 로그인이 되어 있고,
        if (adminRoute && !res.isAdmin) {
          // 관리자라우트에 관리자가 접근하려는데 관리자가 아니라면,
          navigate("/", { replace: true });
          // <Navigate replace to="/" />;
          alert("관리자 전용 페이지 입니다");
        }
        if (option === false) {
          if (location.state) {
            console.log("location.state 존재 로직 탔음");
            // 로그인 뒤 로그인페이지에 머무르는 짧은 시간이 있어서 그때 이동시켜버리는 문제가 발생.
            // 로그인 한 유저는 접근 불가한 페이지로 가려고 한다면,
            navigate(location.state.originalPath.pathname, { replace: true });
          } else {
            console.log("location.state 없음 로직 탔음");
            // 로그인 뒤 로그인페이지에 머무르는 짧은 시간이 있어서 그때 이동시켜버리는 문제가 발생.
            // 로그인 한 유저는 접근 불가한 페이지로 가려고 한다면,
            navigate("/", { replace: true });
          }
        }
      }
    });
    // }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}

// React Router v6부터 component={} 대신 element={}를 사용해야 한다.
// hoc는 엄연히 함수인데, element={}에는 함수가 들어갈 수 없기 때문에 오류가 발생한다. (컴포넌트만 넣을 수 있다)

// solution 1
// hoc 함수를 App.js에 import한 다음, element={}에 넣기 전에 미리 hoc 함수를 적용하면 된다.

// solution 2
// hoc 함수를 적용할 컴포넌트에서 export에 적용하면 된다.

// solution 1 채택.
