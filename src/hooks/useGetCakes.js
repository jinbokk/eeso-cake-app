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

  const { ProductsData } = useSelector((state) => state.product);

  useEffect(() => {
    setMoreCakesLoading(true);

    dispatch(productActions.getProducts(ingredient, pageNum));

    console.log(ProductsData);

    setCakesData((prevCakes) => {
      return [...new Set([...prevCakes, ...ProductsData.results])];
    });

    setHasMore(ProductsData.results.length > 0);

    // dispatch(productActions.getProducts(ingredient, pageNum)).then((res) => {
    //   console.log("res is !!!!!!!!!!!!", res);

    //   setCakesData((prevCakes) => {
    //     return [...new Set([...prevCakes, ...res.data.results])];
    //   });
    //   setHasMore(res.data.results.length > 0);
    // });

    setMoreCakesLoading(false);
  }, [ingredient, pageNum, ProductsData]);

  return { moreCakesLoading, cakesData, hasMore };
}
