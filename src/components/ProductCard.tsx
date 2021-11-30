import React, { useContext } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { formatPrice } from "utils/formatPrice";
import { Context, ProductType } from "stores/store";

function ProductCard({ name, price, nutrients }: ProductType) {
  const { store, dispatch } = useContext(Context);

  return (
    <Box
      w="full"
      maxW="20rem"
      bg="#fce8a6"
      boxShadow="md"
      rounded="md"
      overflow="hidden"
      p={4}
    >
      <Text fontSize="md" fontWeight="bold" mb={2}>
        {name}
      </Text>
      <Text fontSize="sm" mb={4}>
        {store.currency && formatPrice(price, store.currency)}
      </Text>
      <Button
        bg="#ffd326"
        size="sm"
        _hover={{
          bg: "#ffd326",
          boxShadow: "rgb(0 0 0 / 20%) 2px 2px 6px 1px",
        }}
        onClick={() =>
          dispatch({
            type: "ADD_ITEM",
            payload: { name, price, nutrients },
          })
        }
      >
        Add to basket
      </Button>
    </Box>
  );
}

export default ProductCard;
