import React from "react";
import PrivacyPolicy from "../../components/PrivacyPolicy";

import { Container } from "react-bootstrap";

const PrivacyPolicyPage = () => {
  return (
    <>
      <h1 className="text-center py-5">개인정보처리방침</h1>
      <Container
        style={{
          height: "60vh",
          border: "1px solid lightgray",
          width: "90%",
          padding: 0,
          boxSizing: "border-box",
        }}
      >
        <PrivacyPolicy style={{ height: "100%" }} />
      </Container>
    </>
  );
};

export default PrivacyPolicyPage;
