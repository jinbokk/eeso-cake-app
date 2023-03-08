import React, { useLayoutEffect } from "react";
import lottie from "lottie-web";
import error from "./94992-error-404.json";

const ErrorAnimation = () => {
  useLayoutEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("error"), // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: error, // the path to the animation json
    });
  }, []);

  return (
    <>
      <div
        id="error"
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          margin: "0 auto",
          zIndex: "10",
          opacity: "0.4",
        }}
      ></div>
    </>
  );
};

export default ErrorAnimation;
