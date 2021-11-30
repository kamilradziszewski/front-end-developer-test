import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchData } from "query/fetchData";

import Spinner from "components/shared/Spinner";
import Error from "components/shared/Error";
import ProductList from "components/ProductList";
import { useGlobalState } from "context/globalState";
import Basket from "components/Basket";
import { productType } from "components/ProductCard";

function Home() {
  const [state, setState] = useGlobalState();

  const { status, data } = useQuery("data", fetchData);

  useEffect(() => {
    if (data) {
      const TUL: { [key: string]: { current: number; max: number } } = {};
      data.config.tolerableUpperLimits.forEach(
        (item: { id: string; amount: number; unit: string }) => {
          TUL[item.id] = {
            current: 0,
            max: item.amount,
          };
        }
      );

      const basket: { [key: string]: number } = {};
      const prices: { [key: string]: number } = {};

      data.products.forEach((product: productType) => {
        basket[product.name] = 0;
        prices[product.name] = product.price;
      });

      setState({
        ...state,
        products: data.products,
        tolerableUpperLimits: data.config.tolerableUpperLimits,
        currency: data.config.currency,
        TUL,
        basket,
        prices,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (status === "loading" || !state) {
    return <Spinner />;
  }

  if (status === "error") {
    return <Error />;
  }

  return (
    state && (
      <main style={{ minHeight: "100vh", backgroundColor: "#fef6dc" }}>
        <Basket />
        <ProductList products={data.products} />
      </main>
    )
  );
}

export default Home;
