import React from "react";
import Terms from "../../components/Terms";
import { Container } from "react-bootstrap";
const TermsPage = () => {
  return (
    <Container style={{ height: "80vh" }}>
      <Terms style={{ height: "100%" }} />
    </Container>
  );
};

export default TermsPage;
