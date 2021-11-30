import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { formatPrice } from "utils/formatPrice";
import { useGlobalState } from "context/globalState";

function BasketItem({ name, amount }: { name: string; amount: number }) {
  const [state, setState] = useGlobalState();

  function removeFromBasket(item: string) {
    const newTUL = state.TUL;
    state.products
      .find((product: any) => product.name === item)
      .nutrients.forEach((nutrient: any) => {
        newTUL[nutrient.id].current = 0;
      });
    setState({ ...state, basket: { ...state.basket, [item]: 0 }, TUL: newTUL });
  }

  return (
    <Box bg="#e7e8f3" boxShadow="md" rounded="md" overflow="hidden" p={3}>
      <Text fontSize="md" fontWeight="bold" mb={1}>
        {name}
      </Text>
      <Text fontSize="sm" mb={0}>
        Items: {amount}
      </Text>
      <Text fontSize="sm" mb={2}>
        Subtotal:{" "}
        <strong>
          {formatPrice(amount * state.prices[name], state.currency)}
        </strong>
      </Text>
      <Button
        // bg="#ffd326"
        colorScheme="red"
        size="sm"
        _hover={{
          boxShadow: "rgb(0 0 0 / 20%) 2px 2px 6px 1px",
        }}
        onClick={() => removeFromBasket(name)}
      >
        Remove
      </Button>
    </Box>
  );
}

export default BasketItem;
