import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { formatPrice } from "utils/formatPrice";
import { useGlobalState } from "context/globalState";

export type productType = {
  name: string;
  price: number;
  nutrients: [
    {
      id: string;
      amount: number;
    }
  ];
};

function ProductCard({ name, price, nutrients }: productType) {
  const [value] = useGlobalState();

  return (
    <Box
      w={"full"}
      bg="white"
      boxShadow={"md"}
      rounded={"md"}
      overflow={"hidden"}
      p={4}
    >
      <Text fontSize="md" fontWeight="bold" mb={2}>
        {name}
      </Text>
      <Text fontSize="sm" mb={4}>
        {value.currency && formatPrice(price, value.currency)}
      </Text>
      <Button
        bg="#ffd326"
        size="sm"
        _hover={{
          bg: "#ffd326",
          boxShadow: "rgb(0 0 0 / 15%) 2px 2px 6px 1px",
        }}
      >
        Button
      </Button>
    </Box>
  );
}

export default ProductCard;
