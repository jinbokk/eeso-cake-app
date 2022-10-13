import { useEffect, useState } from "react";
import api_eesocake from "../redux/api_eesocake";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../redux/actions/productActions";

export default function useGetCakes(ingredient, pageNum) {
  const dispatch = useDispatch();

  const [moreCakesLoading, setMoreCakesLoading] = useState(true);
  const [cakesData, setCakesData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setCakesData([]);
  }, [ingredient]);

  const { loading, ProductsData } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(productActions.getProducts(ingredient, pageNum));

    setMoreCakesLoading(true);

    if (!loading && cakesData !== []) {
      setCakesData((prevCakes) => {
        return [...new Set([...prevCakes, ...ProductsData.results])];
      });

      setHasMore(ProductsData.results.length > 0);

      setMoreCakesLoading(false);
    } else {
      setCakesData((prevCakes) => {
        return [...new Set([...prevCakes, ...ProductsData.results])];
      });
    }
  }, [loading, ingredient, pageNum]);

  return { loading, moreCakesLoading, cakesData, hasMore };
}
