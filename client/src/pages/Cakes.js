import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import "./css/cakes.css";

import Subnav from "../components/Subnav";
import Loading from "../components/Loading";

import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../redux/actions/productActions";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const Cakes = () => {
  const dispatch = useDispatch();

  const isFirstRun = useRef(true);

  const { loading, moreCakesLoading, productsData, hasMore } = useSelector(
    (state) => state.product
  );

  const { ingredient } = useParams();
  const [searchParams] = useSearchParams();
  const design = searchParams.get("design");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);

    let option = {
      ingredient: ingredient,
      design: design,
    };

    dispatch(productActions.getProducts(option));
    isFirstRun.current = false;
  }, [ingredient, design]);

  useEffect(() => {
    if (!isFirstRun.current && !loading && page !== 1) {
      let url =
        window.location.origin +
        `/cakes/${ingredient}` +
        `${design ? `?design=${design}` : ""}` +
        `${design && page ? `&page=${page}` : `?page=${page}`}`;

      window.history.pushState(null, null, url);

      let option = {
        ingredient: ingredient,
        design: design,
        page: page,
      };

      dispatch(productActions.getMoreProducts(option));
    }
  }, [page]);

  const observer = useRef();

  const lastCakeElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  let loadingText;

  if (ingredient === "rice") {
    loadingText = "???????????? ???????????? ???...";
  } else if (ingredient === "bread") {
    loadingText = "???????????? ???????????? ???...";
  } else if (ingredient === "tart") {
    loadingText = "????????? ???????????? ???...";
  }

  /////  /////  /////  /////

  // const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
  // const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(undefined);

  function handleShow(event, data, breakpoint) {
    // setFullscreen(breakpoint);
    setShow(true);
    setData(data);
  }

  /////  /////  /////  /////

  const titleChanger = (design, index, modal) => {
    if (design === "dome" || design === "crescent" || design === "wreath")
      design = null;

    if (design === "letter") design = "?????????";
    else if (design === "topper") design = "??????";
    else if (design === "bouquet") design = "?????????";
    else if (design === "figure") design = "?????????";
    else if (design === "photo") design = "??????";
    else if (design === "fresh_flower") design = "??????";
    else if (design === "money") design = "???";
    else if (design === "3D") design = "??????";
    else if (design === "tiara") design = "?????????";
    else if (design === "party") design = "??????";
    else if (design === "snack") design = "??????";
    else if (design === "lotto") design = "??????";
    else if (design === "duck") design = "????????????";

    return design ? (
      <span key={index} className={modal ? "modal_design_tag" : "design_tag"}>
        {design}
      </span>
    ) : null;
  };

  return (
    <>
      <Subnav option={ingredient} />

      <Modal
        centered
        size="lg"
        show={show}
        // fullscreen={fullscreen}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal</Modal.Title> */}
        </Modal.Header>

        <Modal.Body>
          <img
            src={data && data.image_url.replace("upload/", "upload/q_50/")}
            alt=""
            className="modal_cake_image"
          />
          <div className="modal_design_tag_container">
            {data &&
              data.design.map((design, index) => {
                return titleChanger(design, index, true);
              })}
          </div>
        </Modal.Body>
      </Modal>

      {loading ? (
        <Loading width={"100vw"} height={"100vh"} text={loadingText} />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: "20px" }}
          animate={{ opacity: 1, y: 0 }}
          // exit={{ opacity: 0 }}
        >
          <Container>
            <Row>
              {productsData.map((item, index) => {
                return (
                  <Col
                    xs={6}
                    sm={6}
                    md={4}
                    lg={3}
                    className="images_container m-0"
                    key={index}
                  >
                    <img
                      ref={
                        productsData.length === index + 1
                          ? lastCakeElementRef
                          : null
                      }
                      src={item.image_url.replace("upload/", "upload/q_50/")}
                      alt=""
                      className="cake_image"
                      onClick={(event) => {
                        handleShow(event, item, "sm-down");
                      }}
                    />
                    <div className="design_tag_container">
                      {item.design.map((design, index) => {
                        return titleChanger(design, index);
                      })}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>

          {moreCakesLoading ? (
            <Loading
              width={"100vw"}
              height={"50vh"}
              text={"????????? ???????????? ???..."}
            />
          ) : null}
        </motion.div>
      )}
    </>
  );
};

export default Cakes;
