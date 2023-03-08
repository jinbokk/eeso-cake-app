import React, { useLayoutEffect } from "react";
import lottie from "lottie-web";
import confetti from "./78667-confetti.json";

const ConfettiAnimation = () => {
  useLayoutEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("confetti"), // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: confetti, // the path to the animation json
    });
  }, []);

  return (
    <>
      <div id="confetti" className="party_animation"></div>
    </>
  );
};

export default ConfettiAnimation;
