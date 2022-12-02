import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Loading from "../components/Loading";
import { forSaleProductAction } from "../redux/actions/forSaleProductAction";
import "./css/order.css";

const Order = () => {
  const dispatch = useDispatch();

  const isFirstRun = useRef(true);
  const { ingredient } = useParams();
  const { loading, forSale_productsData } = useSelector(
    (state) => state.forSaleProduct
  );

  useEffect(() => {
    dispatch(forSaleProductAction.getForSaleProducts());
    isFirstRun.current = false;
  }, []);

  return (
    <div className="pt-5">
      {loading ? (
        <Loading
          width={"100vw"}
          height={"100vh"}
          text={"주문 페이지 불러오는 중"}
        />
      ) : (
        <Container>
          <Row>
            {forSale_productsData.map((item, index) => (
              <Col
                xs={12}
                sm={6}
                md={6}
                lg={3}
                className="align-items-start justify-content-start"
                key={index}
              >
                <a className="my-3 product_card" href={`detail?id=${item._id}`}>
                  <img
                    src={item.image_url}
                    alt=""
                    className="product_image mb-3"
                  />
                  <h4 className="text-start fw-bold px-3">{item.title}</h4>
                  <p className="text-start px-3">{item.description}</p>
                  <h4 className="text-end px-4 mt-auto mb-4">₩ {item.price}</h4>
                </a>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Order;
