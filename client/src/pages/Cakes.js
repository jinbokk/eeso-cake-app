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

  const titleChanger = (design, index, modal) => {
    let string;

    if (modal) {
      string = "modal_";
    } else {
      string = "";
    }

    if (design === "dome" || design === "crescent" || design === "wreath") {
      return null;
    }

    if (design === "letter") {
      return (
        <span key={index} className={`${string}design_tag`}>
          레터링
        </span>
      );
    } else if (design === "topper") {
      return (
        <span key={index} className={`${string}design_tag`}>
          토퍼
        </span>
      );
    } else if (design === "bouquet") {
      return (
        <span key={index} className={`${string}design_tag`}>
          꽃다발
        </span>
      );
    } else if (design === "figure") {
      return (
        <span key={index} className={`${string}design_tag`}>
          피규어
        </span>
      );
    } else if (design === "photo") {
      return (
        <span key={index} className={`${string}design_tag`}>
          포토
        </span>
      );
    } else if (design === "fresh_flower") {
      return (
        <span key={index} className={`${string}design_tag`}>
          생화
        </span>
      );
    } else if (design === "money") {
      return (
        <span key={index} className={`${string}design_tag`}>
          돈
        </span>
      );
    } else if (design === "3D") {
      return (
        <span key={index} className={`${string}design_tag`}>
          입체
        </span>
      );
    } else if (design === "tiara") {
      return (
        <span key={index} className={`${string}design_tag`}>
          티아라
        </span>
      );
    } else if (design === "party") {
      return (
        <span key={index} className={`${string}design_tag`}>
          파티
        </span>
      );
    } else if (design === "snack") {
      return (
        <span key={index} className={`${string}design_tag`}>
          과자
        </span>
      );
    } else if (design === "lotto") {
      return (
        <span key={index} className={`${string}design_tag`}>
          로또
        </span>
      );
    } else if (design === "duck") {
      return (
        <span key={index} className={`${string}design_tag`}>
          오리형제
        </span>
      );
    } else {
      return null;
    }
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
                return titleChanger(design, index, true);
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
                          return titleChanger(design, index);
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
                          return titleChanger(design, index);
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
