import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { forSaleProductAction } from "../redux/actions/forSaleProductAction";
import Loading from "../components/Loading";
import axios from "axios";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  const { loading, productDetail } = useSelector(
    (state) => state.forSaleProduct
  );

  useEffect(() => {
    dispatch(forSaleProductAction.getDetail(productId));
  }, []);

  return (
    <>
      {loading ? (
        <Loading text="상품 세부정보 가져오는 중" />
      ) : (
        <div>{productDetail.title}</div>
      )}
    </>
  );
};

export default ProductDetail;
