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
    
    dispatch(productActions.getProducts(ingredient, pageNum));

    if (!loading) {
      setCakesData((prevCakes) => {
        return [...new Set([...prevCakes, ...ProductsData.results])];
      });

      setHasMore(ProductsData.results.length > 0);
      setMoreCakesLoading(false);
    }
  }, [loading, pageNum]);

  return { loading, moreCakesLoading, cakesData, hasMore };
}
