import React from "react";

const Terms = () => {
  const iframeTerms = () => {
    return {
      __html: '<iframe src="/terms.html" width="100%" height="100%"></iframe>',
    };
  };

  return (
    <div
      dangerouslySetInnerHTML={iframeTerms()}
      style={{ width: "100%", height: "100%" }}
    ></div>
  );
};

export default Terms;
