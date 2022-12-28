import React, { useEffect, useState } from "react";
import "./css/map.css";

const Map = () => {
  const { naver } = window;

  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 표시할 div

    const position = new naver.maps.LatLng(
      37.73715829851119,
      127.08922349318145
    );
    const mapOptions = {
      center: position,
      zoom: 16,
      minZoom: 6,
      // zoomControl: true,
      // zoomControlOptions: {
      //   position: naver.maps.Position.TOP_RIGHT,
      // },
    };

    const map = new naver.maps.Map(container, mapOptions);

    const markerOptions = {
      position: new naver.maps.LatLng(37.736626531464026, 127.09147039297518),
      map: map,
      icon: {
        url: "icons/map_icon.png",
        origin: new naver.maps.Point(0, 0),
      },
      animation: naver.maps.Animation.BOUNCE,
    };

    const marker = new naver.maps.Marker(markerOptions);
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "55vh" }}></div>
    </div>
  );
};

export default Map;
