import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { forSaleProductAction } from "../redux/actions/forSaleProductAction";
import Loading from "../components/Loading";
import axios from "axios";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      exit={{ opacity: 0, y: "-20px" }}
    >
      {loading ? (
        <Loading text="상품 세부정보 가져오는 중" />
      ) : (
        <div>{productDetail.title}</div>
      )}
    </motion.div>
  );
};

export default ProductDetail;
