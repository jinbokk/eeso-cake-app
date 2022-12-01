import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  console.log(productId);

  useEffect(() => {
    axios.get(`/api/products/order/detail?id=${productId}`).then((res) => {
      if (res.data.success) {
        console.log(res.data);
      } else {
        alert("상품 정보를 가져오는데 실패하였습니다.");
      }
    });
  }, []);

  return <div>ProductDetail</div>;
};

export default ProductDetail;
