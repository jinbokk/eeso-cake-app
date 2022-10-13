import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./css/Cakes.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { createTheme } from "@mui/material";
import { productActions } from "../redux/actions/productActions";
import Subnav from "../components/Subnav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

import useGetCakes from "../hooks/useGetCakes";

const Cakes = () => {
  const { ingredient } = useParams();

  const dispatch = useDispatch();

  const [pageNum, setPageNum] = useState(1);

  const { loading, ProductsData } = useSelector((state) => state.product);

  const { cakesData, hasMore, moreCakesLoading } = useGetCakes(
    ingredient,
    pageNum
  );

  const observer = useRef();

  const lastCakeElementRef = useCallback(
    (node) => {
      if (moreCakesLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prevPageNum) => prevPageNum + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [moreCakesLoading, hasMore]
  );

  const style = {
    position: "absolute",
    zIndex: 1000,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "80%",
    bgcolor: "none",
  };

  const [open, setOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);

  const theme = createTheme({
    components: {
      MuiModal: {
        styleOverrides: {
          root: {
            backgroundColor: "rgb(251,239,233,0.7)",
          },
        },
      },
    },
  });

  //Muibackdrop에 적용이 안된다. 다시 볼 것.

  const ModalOpen = () => {
    setOpen(true);
  };

  const ModalClose = () => setOpen(false);

  // const navigate = useNavigate();

  // const changeUrl = (e) => {
  //   navigate(`?design=${e.target.value}`); //url만 유저친화적으로 변경한 것. 랜더에 영향 없음.
  //   dispatch(productFilterActions.getFilteredProducts(e.target.value));
  // };

  return (
    <>
      {loading ? (
        <Loading text={"떡케이크"} />
      ) : (
        <>
          <div className="cakes_page_container">
            <Subnav
              items={[
                { title: "# 레터링 케이크", value: "letter" },
                { title: "# 피규어 케이크", value: "figure" },
                { title: "# 포토 케이크", value: "photo" },
                { title: "# 생화 케이크", value: "fresh_flower" },
                { title: "# 꽃다발 케이크", value: "bouquet" },
                { title: "# 돈 케이크", value: "money" },
                { title: "# 입체 케이크", value: "3D" },
              ]}
            />

            <div className="images_container">
              {cakesData.map((item, index) => {
                if (cakesData.length === index + 1) {
                  return (
                    <img
                      ref={lastCakeElementRef}
                      src={item.image_url}
                      alt=""
                      key={index}
                      className="cake_image"
                      onClick={() => {
                        ModalOpen();
                        setModalInfo({
                          url: item.image_url,
                          designTag: item.design,
                        });
                      }}
                    />
                  );
                } else {
                  return (
                    <img
                      src={item.image_url}
                      alt=""
                      key={index}
                      className="cake_image"
                      onClick={() => {
                        ModalOpen();
                        setModalInfo({
                          url: item.image_url,
                          designTag: item.design,
                        });
                      }}
                    />
                  );
                }
              })}
            </div>
          </div>

          <Modal open={open} onClose={ModalClose} theme={theme}>
            <Box sx={style}>
              <img src={modalInfo.url} alt="" className="modal_cake_image" />
              <div>
                {modalInfo.designTag &&
                  modalInfo.designTag.map((item, index) => (
                    <span className="modal_design_tag" key={index}>
                      {item}
                    </span>
                  ))}
              </div>
            </Box>
          </Modal>

          <Footer />
        </>
      )}
    </>
  );
};

export default Cakes;
