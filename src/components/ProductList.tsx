import React from "react";
import { productType } from "context/globalState";
import { formatPrice } from "utils/formatPrice";

function ProductList({ products }: { products: productType[] }) {
  return (
    <ul>
      {products.map((product) => (
        <p key={product.name}>
          {product.name} [{formatPrice(product.price, "PLN")}]
        </p>
      ))}
    </ul>
  );
}

export default ProductList;
