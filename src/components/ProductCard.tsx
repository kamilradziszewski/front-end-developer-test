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
  const [state, setState] = useGlobalState();

  function canItemBeAddedToBasket() {
    return !nutrients
      .map((nutrient) => {
        return (
          state.TUL[nutrient.id].current + nutrient.amount <=
          state.TUL[nutrient.id].max
        );
      })
      .some((item) => item === false);
  }

  function addToBasket() {
    if (!canItemBeAddedToBasket()) {
      alert("TUL exceeded, you can’t add this product to the basket");
      return;
    }

    const { basket } = state;

    const newTUL = { ...state.TUL };
    nutrients.forEach((nutrient) => {
      const { id, amount } = nutrient;
      newTUL[id].current += amount;
    });

    setState({
      ...state,
      basket: { ...basket, [name]: basket[name] + 1 },
      TUL: newTUL,
    });
  }

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
        {state.currency && formatPrice(price, state.currency)}
      </Text>
      <Button
        bg="#ffd326"
        size="sm"
        _hover={{
          bg: "#ffd326",
          boxShadow: "rgb(0 0 0 / 20%) 2px 2px 6px 1px",
        }}
        onClick={addToBasket}
      >
        Add to basket
      </Button>
    </Box>
  );
}

export default ProductCard;
