import React, { useEffect } from "react";
import "./css/Home.css";

import { useDispatch, useSelector } from "react-redux";

import PreviewItems from "../components/PreviewItems";
import BestItems from "../components/BestItems";
import { productAction } from "../redux/actions/productActions";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, AllProductsData } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(productAction.getProducts());
  }, []);

  useEffect(() => {
    console.log(AllProductsData);
  }, [AllProductsData]);

  return (
    <>
      <div className="home_container_top">
        <div className="home_container">
          <h1 className="main_msg">
            안녕하세요,
            <br />
            이소케이크 입니다
          </h1>
          <div className="sub_img">
            <div className="sub_msg">
              <div>Since 2017</div>
              <div>찾아주셔서 감사합니다</div>
              <div>뜻깊은 날, 더욱 빛나실 수 있도록 정성을 다하겠습니다</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span>
          {loading
            ? null
            : AllProductsData.map((item) => (
                <img src={item.image_url} style={{ width: "200px" }}></img>
              ))}
        </span>
      </div>

      <PreviewItems />
      <BestItems />
    </>
  );
};

export default Home;
