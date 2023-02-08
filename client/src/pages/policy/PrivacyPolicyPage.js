import React from "react";
import PrivacyPolicy from "../../components/PrivacyPolicy";

import { Container } from "react-bootstrap";

const PrivacyPolicyPage = () => {
  return (
    <Container
      style={{ height: "80vh" }}
    >
      <PrivacyPolicy style={{ height: "100%" }} />
    </Container>
  );
};

export default PrivacyPolicyPage;
