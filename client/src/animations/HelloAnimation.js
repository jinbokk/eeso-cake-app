import React, { useLayoutEffect } from "react";
import lottie from "lottie-web";
import hello from "./31779-hello-love.json";

const HelloAnimation = () => {
  useLayoutEffect(() => {
    lottie
      .loadAnimation({
        container: document.getElementById("hello"), // the dom element that will contain the animation
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: hello, // the path to the animation json
      })
      .setSpeed(0.5);
  }, []);

  return (
    <>
      <div
        id="hello"
        style={{
          height: "90%",
          width: "90%",
          margin: "0 auto",
          opacity: "0.8",
        }}
      ></div>
    </>
  );
};

export default HelloAnimation;
