import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/userActions";

export default function Auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(userActions.auth());
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}

// React Rouer v6부터 component={} 대신 element={}를 사용해야 한다.
// hoc는 엄연히 함수인데, element={}에는 함수가 들어갈 수 없기 때문에 오류가 발생한다. (컴포넌트만 넣을 수 있다)

// solution 1
// hoc 함수를 App.js에 import한 다음, element={}에 넣기 전에 미리 hoc 함수를 적용하면 된다.

// solution 2
// hoc 함수를 적용할 컴포넌트에서 export에 적용하면 된다.

// solution 1 채택.
