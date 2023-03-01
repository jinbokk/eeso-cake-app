import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import Loading from "../components/Loading";
import { forSaleProductActions } from "../redux/actions/forSaleProductActions";
import "./css/orderPage.css";

const OrderPage = () => {
  const dispatch = useDispatch();

  const isFirstRun = useRef(true);
  const { ingredient } = useParams();
  const { loading, forSale_productsData } = useSelector(
    (state) => state.forSaleProduct
  );

  useEffect(() => {
    dispatch(forSaleProductActions.getForSaleProducts());
    isFirstRun.current = false;
  }, []);

  return (
    <motion.div
      className="pt-5"
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      {loading ? (
        <Loading
          width={"100vw"}
          height={"100vh"}
          text={"주문 페이지 불러오는 중"}
        />
      ) : (
        <Container>
          {/* <Row className="order_category_top">
            <Col className="order_category">
              <div className="order_category_circle">
                <div className="order_category_title">전체</div>
                <div className="order_category_bg">test</div>
              </div>
            </Col>
            <Col className="order_category">
              <div className="order_category_circle">
                <div className="order_category_title">떡케이크</div>
                <div className="order_category_bg">test</div>
              </div>
            </Col>
            <Col className="order_category">
              <div className="order_category_circle">
                <div className="order_category_title">빵케이크</div>
                <div className="order_category_bg">test</div>
              </div>
            </Col>
            <Col className="order_category">
              <div className="order_category_circle">
                <div className="order_category_title">숫자타르트</div>
                <div className="order_category_bg">test</div>
              </div>
            </Col>
            <Col className="order_category">
              <div className="order_category_circle">
                <div className="order_category_title">시즌케이크</div>
                <div className="order_category_bg">test</div>
              </div>
            </Col>
          </Row> */}
          
          <Row>
            {forSale_productsData.map((item, index) => (
              <Col
                xs={6}
                // sm={6}
                // md={6}
                lg={3}
                className="align-items-start justify-content-start"
                key={index}
              >
                <NavLink
                  className="my-3 product_card"
                  to={`detail/${item._id}`}
                >
                  <img
                    src={item.image_url}
                    alt=""
                    className="product_image mb-3"
                  />
                  <h5 className="text-start fw-bold px-3">{item.title}</h5>
                  <p className="text-start px-3">{item.description}</p>
                  <h5 className="text-end px-4 mt-auto mb-4">
                    ₩ {item.price.toLocaleString("ko-KR")}
                  </h5>
                </NavLink>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </motion.div>
  );
};

export default OrderPage;
