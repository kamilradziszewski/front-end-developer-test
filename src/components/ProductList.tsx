import React from "react";
import ProductCard from "./ProductCard";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { ProductType } from "stores/store";

function ProductList({ products }: { products: ProductType[] }) {
  return (
    <Container maxW="container.xl" bg="#fef6dc" pt={8} pb={12} pr="21rem">
      <Heading as="h2" size="lg" mb={8}>
        Products
      </Heading>
      <SimpleGrid minChildWidth="12rem" spacing={8} justifyItems="center">
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default ProductList;
