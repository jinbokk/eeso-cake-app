import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./css/Cakes.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { createTheme } from "@mui/material";
import { productFilterActions } from "../redux/actions/productFilterActions";
import Subnav from "../components/Subnav";
import Footer from "../components/Footer";

const RiceCakes = () => {
  let { ingredient } = useParams();

  console.log(ingredient);

  const dispatch = useDispatch();

  // const {
  //   loading,
  //   allProductsData,
  //   riceProductsData,
  //   breadProductsData,
  //   tartProductsData,
  // } = useSelector((state) => state.product);

  const {
    loading,
    allProductsData,
    riceProductsData,
    breadProductsData,
    tartProductsData,
  } = useSelector((state) => state.product);

  const productsData = `${ingredient}ProductData`;

  console.log(productsData);

  // const {
  //   filteredProductLoading,
  //   filteredRiceProductsData,
  //   filteredBreadProductsData,
  //   filteredTartProductsData,
  // } = useSelector((state) => state.filteredProduct);

  const style = {
    position: "absolute",
    zIndex: 1000,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "80%",
    bgcolor: "none",
    // border: "2px solid white",
    // boxShadow: 20,
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
        <div>loading</div>
      ) : (
        <>
          <div className="cakes_page_container">
            <Subnav
              items={[
                { title: "# 돔형", value: "dome" },
                { title: "# 초승달형", value: "crescent" },
                { title: "# 리스형", value: "wreath" },
              ]}
            />

            <div className="images_container">
              {productsData.results.map((item, index) => (
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
              ))}
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

export default RiceCakes;
