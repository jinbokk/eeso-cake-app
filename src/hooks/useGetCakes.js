import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../redux/actions/productActions";

export default function useGetCakes(ingredient, pageNum) {
  const dispatch = useDispatch();

  const [moreCakesLoading, setMoreCakesLoading] = useState(true);
  const [cakesData, setCakesData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const { loading, ProductsData } = useSelector((state) => state.product);

  useEffect(() => {
    setCakesData([]);
    dispatch({ type: "GET_ANOTHER_PRODUCTS_REQUEST" });
  }, [ingredient]);

  useEffect(() => {
    setMoreCakesLoading(true);

    if (loading) {
      dispatch(productActions.getProducts(ingredient, pageNum));
    }

    if (!loading) {
      setCakesData((prevCakes) => {
        return [...new Set([...prevCakes, ...ProductsData.results])];
      });

      setHasMore(ProductsData.results.length > 0);
      setMoreCakesLoading(false);
    }
  }, [pageNum, moreCakesLoading]);

  return { loading, moreCakesLoading, cakesData, hasMore };
}

// 첫 로딩시 1번의 dispatch를 한다 >> ingredient를 의존하는 another products request로 로딩 true

// dispatch 시작시 로딩 true > productAction 실행

// productAction 끝난 뒤 로딩 false > 해당 데이터를 setCakesData에 넣는다
