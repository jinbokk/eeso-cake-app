import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import React from "react";

import "./css/Map.css";

const Map = () => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMap
        mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
        style={{
          width: "700px",
          height: "700px",
        }}
        defaultCenter={{ lat: 37.73715829851119, lng: 127.08922349318145 }}
        defaultZoom={17}
        scaleControl={true}
        // logoControl={true}
        mapDataControl={true}
        // zoomControl={true}
        mapTypeControl={true}
        borderWidth={0}
      >
        <Marker
          position={{ lat: 37.736626531464026, lng: 127.09147039297518 }}
          animation={1}
          icon={{
            url: "/icons/map_icon.png",
            size: { width: 100, height: 110 },
          }}
        />
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
};

export default Map;
