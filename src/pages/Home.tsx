import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchData } from "query/fetchData";

import Spinner from "components/shared/Spinner";
import Error from "components/shared/Error";
import ProductList from "components/ProductList";
import { useGlobalState } from "context/globalState";

function Home() {
  const [value, setValue] = useGlobalState();

  const { status, data } = useQuery("data", fetchData);

  useEffect(() => {
    if (data) {
      const currentTolerableUpperLimits: { [key: string]: number } = {};
      data.config.tolerableUpperLimits.forEach(
        (item: { id: string; amount: number; unit: string }) => {
          currentTolerableUpperLimits[item.id] = 0;
        }
      );

      setValue({
        ...value,
        products: data.products,
        tolerableUpperLimits: data.config.tolerableUpperLimits,
        currency: data.config.currency,
        currentTolerableUpperLimits,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (status === "loading" || !value) {
    return <Spinner />;
  }

  if (status === "error") {
    return <Error />;
  }

  return (
    value && (
      <main style={{ minHeight: "100vh", backgroundColor: "#fef6dc" }}>
        <ProductList products={data.products} />
      </main>
    )
  );
}

export default Home;
