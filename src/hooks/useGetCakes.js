import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../redux/actions/productActions";

export default function useGetCakes(ingredient, pageNum) {
  const dispatch = useDispatch();

  const { loading, productsData } = useSelector((state) => state.product);

  const [moreCakesLoading, setMoreCakesLoading] = useState(false);
  const [cakesData, setCakesData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    dispatch({ type: "GET_ANOTHER_PRODUCTS_REQUEST" });
    setCakesData([]);
  }, [ingredient]);

  // useEffect(() => {
  //   setMoreCakesLoading(true);
  //   dispatch(productActions.getProducts(ingredient, pageNum));
  // }, [pageNum]);

  useEffect(() => {

    setMoreCakesLoading(true);
    dispatch(productActions.getProducts(ingredient, pageNum));

    if (!loading) {
      setCakesData((prevCakes) => {
        return [...new Set([...prevCakes, ...productsData.results])];
      });

      setHasMore(productsData.results.length > 0);

      setMoreCakesLoading(false);
    }
  }, [loading, pageNum]);

  return { loading, moreCakesLoading, cakesData, hasMore };
}
