import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./css/Cakes.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { productFilterActions } from "../redux/actions/productFilterActions";

import Subnav from "./Subnav";

const Cakes = () => {
  const dispatch = useDispatch();

  const {
    loading,
    allProductsData,
    riceProductsData,
    breadProductsData,
    tartProductsData,
  } = useSelector((state) => state.product);

  const {
    filteredProductLoading,
    filteredRiceProductsData,
    filteredBreadProductsData,
    filteredTartProductsData,
  } = useSelector((state) => state.filteredProduct);

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

  const navigate = useNavigate();

  const changeUrl = (e) => {
    navigate(`?design=${e.target.value}`); //url만 유저친화적으로 변경한 것. 랜더에 영향 없음.
    dispatch(productFilterActions.getFilteredProducts(e.target.value));
  };

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <div className="cakes_page_container">
            <Subnav />

            <div className="images_container">
              {riceProductsData.results.map((item) => (
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

export default Cakes;
