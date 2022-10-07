import React, { useEffect, useRef } from "react";
import "./css/Home.css";

import { productAction } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

import PreviewItems from "../components/PreviewItems";
import BestItems from "../components/BestItems";
import Landing from "./Landing";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <Landing />
      <PreviewItems />
      <BestItems />
    </>
  );
};

export default Home;
