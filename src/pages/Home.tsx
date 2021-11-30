import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchData } from "query/fetchData";

import Spinner from "components/shared/Spinner";
import Error from "components/shared/Error";
import ProductList from "components/ProductList";
import Basket from "components/Basket";
import { Context } from "stores/store";

function Home() {
  const { store, dispatch } = useContext(Context);
  const { status, data } = useQuery("data", fetchData);

  useEffect(() => {
    if (data) {
      dispatch({
        type: "POPULATE_STORE",
        payload: {
          products: data.products,
          tolerableUpperLimits: data.config.tolerableUpperLimits,
          currency: data.config.currency,
        },
      });
    }
  }, [data, dispatch]);

  if (status === "loading" || !store) {
    return <Spinner />;
  }

  if (status === "error") {
    return <Error />;
  }

  return (
    store && (
      <main style={{ minHeight: "100vh", backgroundColor: "#fef6dc" }}>
        {store.basket && <Basket />}
        {store.products && <ProductList products={store.products} />}
      </main>
    )
  );
}

export default Home;
