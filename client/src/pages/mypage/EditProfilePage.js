import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router";

const EditProfilePage = () => {
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle("회원정보");
  }, []);

  return <div>EditProfilePage</div>;
};

export default EditProfilePage;
