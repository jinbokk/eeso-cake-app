import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { productAction } from "../redux/actions/productActions";
import "swiper/css";
import "./css/Banner.css";

const Banner = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productAction.getProducts());
  }, []);

  const {
    loading,
    allProductsData,
    riceProductsData,
    breadProductsData,
    tartProductsData,
  } = useSelector((state) => state.product);

  return (
    <>
      {!loading ? (
        <div className="main_banner_container_top">
          <div className="banner_text">
            <h1 className="main_msg">안녕하세요, 이소케이크 입니다 :)</h1>
            <h2>無 합성제 無 보존제 無 유화제</h2>
            <h2>갓 구워낸 시트와 신선한 생크림만을 사용합니다</h2>
          </div>
          <Swiper
            spaceBetween={1}
            slidesPerView={1}
            loop={true}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <img
                src={riceProductsData.results[0].image_url}
                className="banner_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={breadProductsData.results[0].image_url}
                className="banner_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={tartProductsData.results[0].image_url}
                className="banner_img"
              ></img>
            </SwiperSlide>
          </Swiper>
        </div>
      ) : null}
    </>
  );
};

export default Banner;
