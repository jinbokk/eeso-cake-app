import React, { useLayoutEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router";

const EditProfilePage = () => {
  const [title, setTitle] = useOutletContext();

  useLayoutEffect(() => {
    setTitle("회원정보");
  }, []);

  return <div>EditProfilePage</div>;
};

export default EditProfilePage;
