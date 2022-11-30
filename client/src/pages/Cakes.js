import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import "./css/cakes.css";

import Subnav from "../components/Subnav";
import Loading from "../components/Loading";

import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../redux/actions/productActions";
import { Container, Row, Col } from "react-bootstrap";

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

  // const getMoreProducts = () => {
  //   let calc_skip = skip + limit;

  //   let body = {
  //     skip: calc_skip,
  //     limit: limit,
  //     loadMore: true,
  //   };

  //   dispatch(productActions.getProducts(body));

  //   setSkip(calc_skip);
  // };

  ////////////////////////////

  // useEffect(() => {
  //   dispatch(
  //     productActions.getProducts({
  //       options: {
  //         ingredient: ingredient,
  //         page: page,
  //         design: design,
  //       },
  //     })
  //   );
  //   isFirstRun.current = false;
  // }, []);

  // useEffect(() => {
  //   if (!isFirstRun.current && !loading) {
  //     setPage(1);
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //     dispatch({ type: "GET_ANOTHER_PRODUCTS_REQUEST" });
  //     dispatch(
  //       productActions.getProducts({
  //         options: {
  //           ingredient: ingredient,
  //           design: design,
  //           page: 1,
  //         },
  //       })
  //     );
  //   }
  // }, [ingredient, design]);

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

  return (
    <>
      <Subnav option={ingredient} />

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
                      />
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
                      <img src={item.image_url} alt="" className="cake_image" />
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
