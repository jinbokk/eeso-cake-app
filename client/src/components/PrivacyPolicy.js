import React from "react";

const privacyPolicy = () => {
  const iframePrivacyPolicy = () => {
    return {
      __html:
        '<iframe src="/privacyPolicy.html" width="100%" height="100%"></iframe>',
    };
  };

  return (
    <div
      dangerouslySetInnerHTML={iframePrivacyPolicy()}
      style={{ width: "100%", height: "100%"}}
    ></div>
  );
};

export default privacyPolicy;
