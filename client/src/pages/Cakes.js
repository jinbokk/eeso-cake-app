import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

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
      console.log(page);

      console.log(window.location);

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
    loadingText = "떡케이크 가져오는 중...";
  } else if (ingredient === "bread") {
    loadingText = "빵케이크 가져오는 중...";
  } else if (ingredient === "tart") {
    loadingText = "타르트 가져오는 중...";
  }

  /////  /////  /////  /////

  // const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(undefined);

  function handleShow(event, data, breakpoint) {
    console.log(event.currentTarget);
    setFullscreen(breakpoint);
    setShow(true);
    setData(data);
  }

  /////  /////  /////  /////

  const titleChanger = (design) => {
    let title;

    if (design === "dome" || design === "crescent" || design === "wreath") {
      return null;
    }

    if (design === "letter") {
      title = "레터링";
    } else if (design === "topper") {
      title = "토퍼";
    } else if (design === "bouquet") {
      title = "꽃다발";
    } else if (design === "figure") {
      title = "피규어";
    } else if (design === "photo") {
      title = "포토";
    } else if (design === "fresh_flower") {
      title = "생화";
    } else if (design === "money") {
      title = "돈";
    } else if (design === "3D") {
      title = "입체";
    } else if (design === "tiara") {
      title = "티아라";
    } else if (design === "party") {
      title = "파티";
    } else if (design === "snack") {
      title = "과자";
    } else if (design === "lotto") {
      title = "로또";
    } else if (design === "duck") {
      title = "오리삼형제";
    } else {
      return null;
    }

    return title;
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
            src={data && data.image_url}
            alt=""
            className="modal_cake_image"
          />
          <div className="modal_design_tag_container">
            {data &&
              data.design.map((design, index) => {
                return (
                  <span key={index} className="modal_design_tag">
                    {titleChanger(design)}
                  </span>
                );
              })}
          </div>
        </Modal.Body>
      </Modal>

      {loading ? (
        <Loading width={"100vw"} height={"100vh"} text={loadingText} />
      ) : (
        <>
          <Container>
            <Row>
              {productsData.map((item, index) => {
                if (productsData.length === index + 1) {
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
                        ref={lastCakeElementRef}
                        src={item.image_url}
                        alt=""
                        className="cake_image"
                        onClick={(event) => {
                          handleShow(event, item, "sm-down");
                        }}
                      />
                      <div className="design_tag_container">
                        {item.design.map((design, index) => {
                          return (
                            <span key={index} className="design_tag">
                              {titleChanger(design)}
                            </span>
                          );
                        })}
                      </div>
                    </Col>
                  );
                } else {
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
                        src={item.image_url}
                        alt=""
                        className="cake_image"
                        onClick={(event) => {
                          handleShow(event, item, "sm-down");
                        }}
                      />
                      <div className="design_tag_container">
                        {item.design.map((design, index) => {
                          return (
                            <span key={index} className="design_tag">
                              {titleChanger(design)}
                            </span>
                          );
                        })}
                      </div>
                    </Col>
                  );
                }
              })}
            </Row>
          </Container>

          {moreCakesLoading ? (
            <Loading
              width={"100vw"}
              height={"50vh"}
              text={"이미지 가져오는 중..."}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default Cakes;
