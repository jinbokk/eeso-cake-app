import React from "react";
import Map from "../components/Map";

import "./css/Contact.css";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <div className="contact_container">
        <div>
          <div>케이크 사이즈 안내</div>
          <img src="/images/cake_size.png" className="cakes_size_image" />
        </div>

        <div>
          <div className="map_container">
            <div>오시는 길 안내</div>
            <Map />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
