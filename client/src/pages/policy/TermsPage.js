import React from "react";
import Terms from "../../components/Terms";
import { Container } from "react-bootstrap";
const TermsPage = () => {
  return (
    <>
      <h1 className="text-center py-5">이용약관</h1>
      <Container
        style={{
          height: "60vh",
          border: "1px solid lightgray",
          width: "90%",
          padding: 0,
          boxSizing: "border-box",
        }}
      >
        <Terms style={{ height: "100%" }} />
      </Container>
    </>
  );
};

export default TermsPage;
