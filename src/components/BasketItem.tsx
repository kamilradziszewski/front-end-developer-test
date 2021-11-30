import React, { useContext } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { formatPrice } from "utils/formatPrice";
import { Context } from "stores/store";

function BasketItem({
  name,
  amount,
  price,
  nutrients,
}: {
  name: string;
  amount: number;
  price: number;
  nutrients: any[];
}) {
  const { store, dispatch } = useContext(Context);

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
          {store.currency && formatPrice(amount * price, store.currency)}
        </strong>
      </Text>
      <Button
        colorScheme="red"
        size="sm"
        _hover={{
          boxShadow: "rgb(0 0 0 / 20%) 2px 2px 6px 1px",
        }}
        onClick={() =>
          dispatch({
            type: "REMOVE_ITEM",
            payload: { name, price, amount, nutrients },
          })
        }
      >
        Remove
      </Button>
    </Box>
  );
}

export default BasketItem;
