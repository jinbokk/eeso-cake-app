import React, { useEffect, useRef, useState } from "react";

import "./css/sidebar.css";

import { gsap } from "gsap";

const Sidebar = () => {
  const el = useRef();
  const q = gsap.utils.selector(el);

  // useEffect(() => {
  //   gsap.fromTo(
  //     q(".ease_in_right"),
  //     { opacity: 0, x: 200 },
  //     {
  //       delay: 2.5,
  //       opacity: 1,
  //       duration: 1,
  //       ease: "back.out(2)",
  //       x: 0,
  //     }
  //   );
  // }, []);

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll === 0) {
      setScrolled(false);
    } else if (currentScroll > 0) {
      setScrolled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* <div className="sidebar_container" ref={el}>
        <div className="ease_in_right">
          <div>
            <a
              href="https://www.instagram.com/eeso_cake/?hl=ko"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons/instgram.png" alt="" className="sidebar_icon" />
            </a>
          </div>
          <div>
            <a
              href="https://blog.naver.com/eesocake"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons/naver.png" alt="" className="sidebar_icon" />
            </a>
          </div>
          <div>
            <a
              href="https://pf.kakao.com/_ZyKnd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons/kakaotalk.png" alt="" className="sidebar_icon" />
            </a>
          </div>
        </div>
      </div> */}

      <button
        className="go_to_top_button"
        onClick={() => scrollToTop()}
        style={
          scrolled
            ? { opacity: "1", bottom: "80px", transition: "0.5s" }
            : { opacity: "0", bottom: "-80px", transition: "0.5s" }
        }
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-arrow-up-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
            />
          </svg>
        </div>
      </button>
    </>
  );
};

export default Sidebar;
