import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { TbMoodCry } from "react-icons/tb";

import Loading from "../components/Loading";
import { forSaleProductActions } from "../redux/actions/forSaleProductActions";
import "./css/orderPage.css";
import useWindowDimensions from "../hooks/useWindowDimensions";

const OrderPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { width } = useWindowDimensions();

  const { loading, forSale_productsData } = useSelector(
    (state) => state.forSaleProduct
  );

  useEffect(() => {
    dispatch(forSaleProductActions.getForSaleProducts(category));
  }, [category]);

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
        <Container className="p-0 overflow-hidden">
          <Row className="order_category_top justify-content-start align-items-center p-3 mb-4">
            <Col className="order_category">
              <NavLink
                to="/order/all"
                className={({ isActive }) =>
                  isActive
                    ? "active_category order_category_circle circle_bg_1"
                    : "order_category_circle circle_bg_1"
                }
              >
                <div className="order_category_title"># 전체보기</div>
                <div className="order_category_bg">
                  <img
                    src="/images/nav_logo.png"
                    alt=""
                    className="category_image"
                  />
                </div>
              </NavLink>
            </Col>
            <Col className="order_category">
              <NavLink
                to="/order/rice"
                className={({ isActive }) =>
                  isActive
                    ? "active_category order_category_circle"
                    : "order_category_circle"
                }
              >
                <div className="order_category_title"># 떡케이크</div>
                <div className="order_category_bg">
                  <img
                    src="/images/order_page_icon/rice_cake_icon.png"
                    alt=""
                    className="category_image"
                  />
                </div>
              </NavLink>
            </Col>
            <Col className="order_category">
              <NavLink
                to="/order/bread"
                className={({ isActive }) =>
                  isActive
                    ? "active_category order_category_circle"
                    : "order_category_circle"
                }
              >
                <div className="order_category_title"># 빵케이크</div>
                <div className="order_category_bg">
                  <img
                    src="/images/order_page_icon/bread_cake_icon.png"
                    alt=""
                    className="category_image"
                  />
                </div>
              </NavLink>
            </Col>
            <Col className="order_category">
              <NavLink
                to="/order/tart"
                className={({ isActive }) =>
                  isActive
                    ? "active_category order_category_circle"
                    : "order_category_circle"
                }
              >
                <div className="order_category_title"># 타르트</div>
                <div className="order_category_bg">
                  <img
                    src="/images/order_page_icon/tart_icon.png"
                    alt=""
                    className="category_image"
                  />
                </div>
              </NavLink>
            </Col>
            <Col className="order_category">
              <NavLink
                to="/order/season"
                className={({ isActive }) =>
                  isActive
                    ? "active_category order_category_circle"
                    : "order_category_circle"
                }
              >
                <div className="order_category_title"># 시즌케이크</div>
                <div className="order_category_bg">
                  {" "}
                  <img
                    src="/images/order_page_icon/season_cake_icon.png"
                    alt=""
                    className="category_image"
                  />
                </div>
              </NavLink>
            </Col>
          </Row>

          {category === "all" && (
            <Row className="sub_title px-4 pt-4 pb-5">
              <Col lg={12} xs={12} className="text-center">
                <h3># 전체보기</h3>
              </Col>
              <Col lg={12} xs={12} className="text-center">
                <h5>주문 가능한 모든 케이크를 둘러보세요!</h5>
              </Col>
            </Row>
          )}
          {category === "rice" && (
            <Row className="sub_title px-4 pt-4 pb-5">
              <Col lg={12} xs={12} className="text-center">
                <h3># 떡케이크</h3>
              </Col>
              <Col lg={12} xs={12} className="text-center">
                <h5>설기떡 위에 아름다운 앙금 꽃을 올린 케이크!</h5>
                <h5>심플하고 고급스러운 이소케이크의 오리지널 케이크 입니다</h5>
              </Col>
            </Row>
          )}
          {category === "bread" && (
            <Row className="sub_title px-4 pt-4 pb-5">
              <Col lg={12} xs={12} className="text-center">
                <h3># 빵케이크</h3>
              </Col>
              <Col lg={12} xs={12} className="text-center">
                {width < 992 ? (
                  <>
                    <h5>심플한 레터링 케이크부터 귀여운 피규어 케이크</h5>
                    <h5>먹을 수 있는 포토 케이크까지!</h5>
                    <h5>모든 순간, 모든 공간에 어울리는</h5>
                    <h5>이소케이크의 시그니처 케이크입니다</h5>
                  </>
                ) : (
                  <>
                    <h5>
                      심플한 레터링 케이크부터 귀여운 피규어 케이크, 먹을 수
                      있는 포토 케이크까지
                    </h5>
                    <h5>
                      모든 순간, 모든 공간에 어울리는 이소케이크의 시그니처
                      케이크
                    </h5>
                  </>
                )}
              </Col>
            </Row>
          )}
          {category === "tart" && (
            <Row className="sub_title px-4 pt-4 pb-5">
              <Col lg={12} xs={12} className="text-center">
                <h3># 타르트</h3>
              </Col>
              <Col lg={12} xs={12} className="text-center">
                <h5>신선한 타르트 생지를 구워 꽃과 과일로 장식해 드립니다!</h5>
                <h5>
                  특별한 숫자, 기호, 문양 등을 심플하고 아름답게 기념해 보세요
                </h5>
              </Col>
            </Row>
          )}
          {category === "season" && (
            <Row className="sub_title px-4 pt-4 pb-5">
              <Col lg={12} xs={12} className="text-center">
                <h3># 시즌케이크</h3>
              </Col>
              <Col lg={12} xs={12} className="text-center">
                <h5>
                  각 시즌에 맞추어, 다양한 디자인의 한정 케이크들을 선보일
                  예정입니다.
                </h5>
                <h5>
                  어디에도 없는 이소케이크만의 특별한 케이크로 특별한 날을 더욱
                  특별하게 만들어 보세요!
                </h5>
              </Col>
            </Row>
          )}

          <Row>
            {forSale_productsData.length !== 0 ? (
              forSale_productsData.map((item, index) => (
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
                    to={`/order/detail/${item._id}`}
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
              ))
            ) : (
              <Col className="text-center py-5">
                <div style={{ color: "gray" }}>
                  <div className="mb-4">
                    <TbMoodCry className="me-3" size={60} />
                  </div>
                  <div style={{ fontSize: "2rem" }}>
                    현재 주문 가능한 케이크가 없습니다
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      )}
    </motion.div>
  );
};

export default OrderPage;
