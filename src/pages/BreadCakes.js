import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./css/BreadCakes.css";

import Sidebar from "../components/Sidebar";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const BreadCakes = () => {
  // const dispatch = useDispatch();

  // dispatch();

  const {
    loading,
    allProductsData,
    riceProductsData,
    breadProductsData,
    tartProductsData,
  } = useSelector((state) => state.product);

  const style = {
    position: "absolute",
    zIndex: 1000,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "80%",
    bgcolor: "none",
    border: "2px solid white",
    boxShadow: 20,
  };

  const [open, setOpen] = useState(false);
  const [doc, setDoc] = useState(false);

  const ModalOpen = () => {
    setOpen(true);
  };

  const ModalClose = () => setOpen(false);

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <div className="cakes_page_container">
            <div className="filter_container">
              <button className="filter_button"># 피규어 케이크</button>
              <button className="filter_button"># 포토 케이크</button>
              <button className="filter_button"># 레터링 케이크</button>
              <button className="filter_button"># 생화 케이크</button>
              <button className="filter_button"># 3D 케이크</button>
              <button className="filter_button"># 토퍼</button>
            </div>

            <div className="images_container">
              {console.log("breadProductsData", breadProductsData)}
              {breadProductsData.results.map((item) => (
                <img
                  src={item.image_url}
                  alt=""
                  className="cake_image"
                  onClick={() => {
                    ModalOpen();
                    setDoc({ url: item.image_url, designTag: item.design });
                  }}
                />
              ))}
            </div>
          </div>

          <Modal open={open} onClose={ModalClose} className="modal_backdrop">
            <Box sx={style}>
              <img src={doc.url} alt="" className="modal_cake_image" />
              <div>
                {doc.designTag &&
                  doc.designTag.map((item) => (
                    <span className="modal_design_tag">{item}</span>
                  ))}
              </div>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default BreadCakes;
