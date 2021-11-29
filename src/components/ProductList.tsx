import React from "react";
import ProductCard, { productType } from "./ProductCard";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";

function ProductList({ products }: { products: productType[] }) {
  return (
    <Container maxW="container.lg" bg="#fef6dc" pt={8} pb={12}>
      <Heading as="h2" size="lg" mb={8}>
        Products
      </Heading>
      <SimpleGrid minChildWidth="12rem" spacing={8}>
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default ProductList;
